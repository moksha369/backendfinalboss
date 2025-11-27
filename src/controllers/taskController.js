const taskService = require('../services/taskService');

const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

exports.create = catchAsync(async (req, res, next) => {
  const task = await taskService.createTask(req.body, req.user.id);
  res.status(201).json({ status: 'success', data: task });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const tasks = await taskService.getAllTasks(req.user.id);
  res.status(200).json({ status: 'success', results: tasks.length, data: tasks });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const task = await taskService.getTaskById(req.params.id, req.user.id);
  res.status(200).json({ status: 'success', data: task });
});

exports.update = catchAsync(async (req, res, next) => {
  const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
  res.status(200).json({ status: 'success', data: task });
});

exports.delete = catchAsync(async (req, res, next) => {
  await taskService.deleteTask(req.params.id, req.user.id);
  res.status(204).json({ status: 'success', data: null });
});