// src/services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se que o User.js está em src/models/
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

exports.registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError('O e-mail já está em uso.', 400);
  }

  const newUser = await User.create({
    email: userData.email,
    password: userData.password
  });

  const token = signToken(newUser._id);
  newUser.password = undefined; // Remove senha do retorno

  return { user: newUser, token };
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Por favor, forneça e-mail e password.', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Credenciais incorretas.', 401);
  }

  const token = signToken(user._id);
  user.password = undefined;

  return { user, token };
};