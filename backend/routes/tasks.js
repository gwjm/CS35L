const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let Task = require('../models/task.model');
let Project = require('../models/project.model');

// Get all tasks
router.get('/getall', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/add/:id', async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate,
    assignedUsers: req.body.assignedUsers
  });

  try {
    const newTask = await task.save();
    project.tasklist.push(newTask._id)
    await project.save()
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "failed in task creation" });
  }
});

// Update a task
router.patch('/update/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/delete/:id', async (req, res) => {
  try {
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'task not found'})
    }

    await Task.findOneAndDelete({_id:id});
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
