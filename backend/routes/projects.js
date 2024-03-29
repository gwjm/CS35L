const router = require('express').Router();
let Project = require('../models/project.model');
const mongoose = require('mongoose')

//retrieve all project
router.get('/', async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1})
    .populate('owner')
    .populate({path: 'members', model: 'User'})
    .populate({path: 'tasklist', model: 'Task'})
    .exec()
  res.status(200).json(projects)
});

//get a single project
router.get('/find/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }

  const project = await Project.findById(id)
    .populate('owner')
    .populate({path: 'members', model: 'User'})
    .populate({path: 'tasklist', model: 'Task'})
    .exec()

  //dont execute rest of code if not found
  if (!project) {
    return res.status(404).json({error: 'Project not found'})
  }

  res.status(200).json(project)
})

//get projects by ownerid
router.get('/findbyowner/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }
  const projects = await Project.find({owner: id})
    .populate('owner')

  if(!projects) {
    return res.status(404).json({error: 'No projects found'})
  }
  res.status(200).json(projects)
})

//get projects which you are a member of
router.get('/findbymember/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }
  const projects = await Project.find({ members: { $in: [id] } })
    .populate('owner')

  if(!projects) {
    return res.status(404).json({error: 'No projects found'})
  }
  res.status(200).json(projects)
})

//add a project
router.post('/add', async (req, res) => {
  const {title, owner, description, deadline, tasklist, members} = req.body

  try {
    const newProject = await Project.create({ title, owner, description, deadline, tasklist, members });
    res.status(200).json(newProject)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

});

//delete a project 
router.delete('/delete/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }
  const todolist = await Project.findById(id).select('tasklist')
  for (let i = 0; i < todolist.length; i++) {
    await Task.findByIdAndDelete(todolist[i])
  }
  
  const project = await Project.findOneAndDelete({_id: id})

  if (!project) {
    return res.status(404).json({error: 'Project not found'})
  }

  res.status(200).json(project)
});

//update a projects
router.patch('/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }

  const project = await Project.findOneAndUpdate({_id: id}, {
    ...req.body
    //spreads this object and puts the req body contents into project body contents
  })
  
  if (!project) {
    return res.status(404).json({error: 'Project not found'})
  }
  
  res.status(200).json(project)

});


module.exports = router;