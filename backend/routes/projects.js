const router = require('express').Router();
let Project = require('../models/project.model');
const mongoose = require('mongoose')

//retrieve all workouts
router.get('/', async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1})
    .populate('owner')
    .exec()
  res.status(200).json(projects)
});

//get a single workout
router.get('/find/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }

  const project = await Project.findById(id)

  //dont execute rest of code if not found
  if (!project) {
    return res.status(404).json({error: 'Project not found'})
  }

  res.status(200).json(project)
})

//add a workout
router.post('/add', async (req, res) => {
  const {title, owner, description} = req.body

  try {
    const newProject = await Project.create({ title, owner, description });
    res.status(200).json(newProject)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

});

//delete a workout 
router.delete('/delete/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Project not found'})
  }
  
  const project = await Project.findOneAndDelete({_id: id})

  if (!project) {
    return res.status(404).json({error: 'Project not found'})
  }

  res.status(200).json(project)
});

//update a workout
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