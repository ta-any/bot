const jwt = require('jsonwebtoken');
const config = require('../config').secret();
const repo = require('../repositories/bd');

// function authenticate(req, res, next) {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   console.log(token)
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }
//
//   try {
//     const decoded = jwt.verify(token, config.jwtSecret);
//     console.log(decoded)
//     req.user = decoded;
//     console.log(111)
//     // return
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token.' });
//   }
// }

// module.exports = authenticate;