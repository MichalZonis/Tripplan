const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { secret } = require('../assets/secret');

exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash
        }).then(user => {
            const maxAge = 3 * 60 * 60; // 3hrs in s
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
                secret, 
              { expiresIn: maxAge }
            );
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            
            res.status(200).json({
              message: "User successfully created",
              user,
            })
          }
        )
      })
    } catch (error) {
      res.status(500).json({
        message: "User not created",
        error: error.mesage,
      })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
          message: "Username or Password not present",
        })
    }
    
    try {
      const user = await User.findOne({ username })
      // if did not find a user with that username
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "Username or password is incorrect",
        })
      } else {
        // compare the password's hash with the stored hash
        bcrypt.compare(password, user.password).then((result) => {
          // if equal (correct password)
          if (result) {
            // build the JWT cookie
            const maxAge = 3 * 60 * 60; // 3hrs in sec
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
                secret,
              { expiresIn: maxAge }
            );

            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });

            res.status(200).json({
              message: "Login successfull",
              user: user
            })
          // else - wrong password
          } else {
            res.status(401).json({
              message: "Login not successful",
              error: "Username or password is incorrect",
            })
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      })
    }
}

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

exports.validateAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if(error) {
        return res.status(401).json({message: "unauthorized"})
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({message: "unauthorized"})
        } else {
          next()
        }
      }
    })
  } else {
    return res.status(401).json({message: "unauthorized, token unavailable"})
  }
}

exports.validateBasic = async (req, res, next ) => {
  const token = req.cookies.jwt;
  // if there's a token
  if (token) {
    // validate the token via our little secret
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        return res.status(401).json({message: "unauthorized"})
      } else {
        next();
      }
    })
  } else {
    return res.status(401).json({message: "unauthorized, token unavailable"})
  }
}