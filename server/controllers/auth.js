const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { secret } = require('../assets/secret');
const { OAuth2Client } = require('google-auth-library');
const { GoogleClientID } = require('../config/auth.config');
const crypto = require('crypto');

// receive userId and return signed JWT promise
async function buildJWT(userID) {
  const MAX_AGE = 3 * 60 * 60; // 3hrs in sec
  const user = await User.findById(userID)
  if(!user) {
    // handle exception
  } else {
    // build the JWT
    const tokenPromise = jwt.sign(
      { id: user._id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
        secret,
      { expiresIn: MAX_AGE }
    );
    return tokenPromise
  }
} 

// register a new user. returns an access token
exports.register = async (req, res, next) => {
    const MIN_PWD_LENGTH = 6;
    const { email, password, firstName, lastName } = req.body;

    if (password.length < MIN_PWD_LENGTH) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({message: "missing parameters"})
    }
    
    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          email,
          password: hash,
          firstName,
          lastName
        }).then(user => {
            buildJWT(user.id).then(token => {
              res.status(200).json({
                message: "User successfully created",
                email: user.email,
                role: user.role,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: token
              })
            });
          }
        )
      })
    } catch (error) {
      res.status(500).json({
        message: "User not created",
        error: error.message,
      })
    }
}

// login using email & password. returns an access token
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ email })

    bcrypt.compare(password, user.password).then((result) => {
      // if equal (correct password) and found user
      if (result && user) {
        // build the JWT
        buildJWT(user.id).then((token) => {
          res.status(200).json({
            message: "Login successfull",
            email: user.email,
            role: user.role,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            accessToken: token
          })
        })
      // else - wrong password or unknown username
      } else {
        res.status(401).json({
          message: "Login not successful",
          error: "Username or password is incorrect",
        })
      }
    })
    } catch (error) {
        res.status(500).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }

// setting a user's role to admin
exports.setAdmin = async (req, res, next) => {
  const { id } = req.body;
  // Verifying if id is presnt
  if (id) {
      // Finds the user with the id
      await User.findById(id)
        .then((user) => {
          // Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = "admin";
            user.save().then(() => {
              res.status(201).json({message: "Update successfull"})
            }).catch((error) => {
              res.status(500).json({message: "An error occurred", error: error.message})
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "An error occurred", error: error.message });
      });
  }
}

// delete an existing user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body
  await User.findById(id).then((user) => {
    user.deleteOne().then(() => {
      res.status(201).json({message: "Deleted successfully"})
    }).catch((error) => {
      res.status(500).json({message: "An error occurred", error: error.message})
    })
  })
}

// login using an access token. returns the decoded token
exports.assertAccessToken = async (req, res, next) => {
  const { accessToken } = req.body;
  if(!accessToken) {
    res.status(401).json({message: "No token given"})
  } else {
    jwt.verify(accessToken, secret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({message: "Invalid token"})
      } else {
        res.status(200).json({decodedToken: decodedToken})
      }
    })
  }
}

// login using google id. returns access token
// also handles the registration
exports.assertGoogleToken = async (req, res, next) => {
  const client = new OAuth2Client();
  const { token } = req.body;
  if(!token) {
    res.status(401).json({message: "missing token"})
  } else {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GoogleClientID
      });
      const payload = ticket.getPayload(); // this is the decoded token
    
      const user = await User.findOne({email: payload.email})
      
      if (!user) { // register
        try {
          // generate random password
          const password = crypto.randomBytes(20).toString('hex');
          bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
              email: payload.email,
              password: hash,
              firstName: payload.given_name,
              lastName: payload.family_name
            }).then(user => {
              buildJWT(user.id).then(token => {
                res.status(200).json({
                  message: "registered using google",
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  role: user.role,
                  accessToken: token
                })
              })
            })
          })
        } catch (error){
          res.status(500).json({message: "error during registration of google user", error: error})
        }
      } else {
        buildJWT(user.id).then(token => {
          res.status(200).json({
            message: "logged in using google",
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            accessToken: token
          })
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(401).json({message: "error:" + err})
    }
  }
}