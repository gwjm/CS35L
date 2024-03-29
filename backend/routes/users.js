const router = require('express').Router();
let User = require('../models/user.model');
const Project = require("../models/project.model");
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})
    // .populate({path: 'friends', model: 'User'})
    // .exec()
  res.status(200).json(users)
});

router.get('/find/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'User not found'})
  }

  const user = await User.findById(id)

  //dont execute rest of code if not found
  if (!user) {
    return res.status(404).json({error: 'User not found'})
  }

  res.status(200).json(user)
})

router.get('/findusername/:username', async (req, res) => {

  const user = await User.findOne({username: req.params.username})

  //dont execute rest of code if not found
  if (!user) {
    return res.status(404).json({error: 'User not found'})
  }

  res.status(200).json(user)
})

router.patch('/:id', async (req, res) => {
  const {id} = req.params
  if( !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'User not found'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!user) {
    return res.status(404).json({error: 'User not found'})
  }
  
  res.status(200).json(user)
});

router.route('/addFriend/:id').patch((req, res) => {

  User.findOneAndUpdate(req.params.id)
    .then( user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.ownedprojects = req.body.ownedprojects;
      user.joinedprojects = req.body.joinedprojects;
      user.friends = req.body.friends;
      user.ownedprojects = req.body.ownedprojects;
      user.joinedprojects = req.body.joinedprojects;

      // console.log(user)
      user.friends = req.body.friends;

  

      user.save()
        .then(() => res.json('Friend added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/createUser').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const newUser = new User({username, email, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/loginUser').post((req, res) => {
  const {username, password} = req.body;
  if(!username || !password){
    return res.status(422).json({error: "Please add username or password"});
  }
  const cur = await(User.findOne({username: username}));

  if(!cur) return res.status(200).json({error: "Invalid username"});

  let validpassword;
  cur.password === password ? (validpassword = true) : (validpassword = false);

  validpassword ? res.status(200).json({message: "Successfully signed in"}) : res.status(200).json({error: "Invalid password"});
});

router.route('/deleteUser').delete((req, res) => {
  if (!req.body.id) {
    return res.status(422).json({error: "Please add user id"});
  }
  const user = User.findOne({_id: req.body.id});
  if(!user) return res.status(422).json({error: "Invalid user id"});
  const ownedprojects = user.ownedprojects;
  // delete all owned projects
  for(let i = 0; i < ownedprojects.length; i++){
    Project.delete(ownedprojects[i]);
  }
  User.delete(req.body.id).then((data) => res.status(200).json(data)).catch((error) => res.status(422).json({error: "Invalid user id"}));
});

module.exports = router;