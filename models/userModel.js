const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
  },
  email: {
    type: String,
    required: [true, 'user must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'provide valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'provide a password'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
