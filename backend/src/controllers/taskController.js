const Task = require('../models/Task');

const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id
  });

  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  if (req.user.role === 'admin') {
    const tasks = await Task.findAll();
    return res.json(tasks);
  }

  const tasks = await Task.findAll({
    where: { userId: req.user.id }
  });

  res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.user.role !== 'admin' &&
      task.userId !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  await task.save();

  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.user.role !== 'admin' &&
      task.userId !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' });
  }

  await task.destroy();
  res.json({ message: 'Task deleted' });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};