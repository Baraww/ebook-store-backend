// config.js
require('dotenv').config();

module.exports = {
  mongoURI: process.env.mongoURI,
  jwtSecret: process.env.jwtSecret
};