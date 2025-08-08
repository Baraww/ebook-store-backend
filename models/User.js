// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can share the same email
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'], // Role can only be one of these values
    default: 'customer'
  },

  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);

