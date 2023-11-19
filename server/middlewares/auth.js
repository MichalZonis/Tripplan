const jwt = require('jsonwebtoken');
const { secret } = require('../assets/secret');

exports.validateAdmin = async (req, res, next) => {
    // get the JWT cookie
    const token = req.cookies.jwt;
    // if there's a cookie
    if (token) {
        // verify the cookie
      jwt.verify(token, secret, (error, decodedToken) => {
        if(error) {
          return res.status(401).json({message: "unauthorized"})
        } else {
            // if not admin
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