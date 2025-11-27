const authService = require('../services/authService');

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

exports.register = catchAsync(async (req, res, next) => {
  const { user, token } = await authService.registerUser(req.body);

  res.status(201).json({
    status: 'success',
    data: { user, token }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { user, token } = await authService.loginUser(req.body);

  res.status(200).json({
    status: 'success',
    data: { user, token }
  });
});