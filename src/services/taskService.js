const Task = require('../models/Task');
const AppError = require('../utils/appError');

exports.createTask = async (taskData, userId) => {
  const task = await Task.create({
    ...taskData,
    userId 
  });
  return task;
};


exports.getAllTasks = async (userId) => {
  return await Task.find({ userId }).sort({ createdAt: -1 });
};

exports.getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  
  if (!task) {
    throw new AppError('Tarefa não encontrada ou acesso não autorizado.', 404);
  }
  return task;
};

exports.updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId }, 
    updateData,
    { new: true, runValidators: true } 
  );

  if (!task) {
    throw new AppError('Tarefa não encontrada ou acesso não autorizado.', 404);
  }
  return task;
};


exports.deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!task) {
    throw new AppError('Tarefa não encontrada ou acesso não autorizado.', 404);
  }
  return true; 
};