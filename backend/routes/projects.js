const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const owner = req.body.owner;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const deadline = Date.parse(req.body.date);
  //TODO
  //const members
  //const permissions

  const newProject = new Project({
    title,
    owner,
    description,
    date,
    deadline,
    members,
    permissions,
  });

  newProject.save()
  .then(() => res.json('Project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

 router.route('/delete').delete((req, res) => {
   if(!req.body.id){
     return res.status(422).json({error: "Please add project id"});
   }
   Project.delete(req.body.id).then((data)=> res.status(200).json(data)).catch((error)=>res.status(422).json({error: `Error: ${error}`}));
 });
// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
//   router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Exercise deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
//   router.route('/update/:id').post((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => {
//         exercise.username = req.body.username;
//         exercise.description = req.body.description;
//         exercise.duration = Number(req.body.duration);
//         exercise.date = Date.parse(req.body.date);
  
//         exercise.save()
//           .then(() => res.json('Exercise updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;