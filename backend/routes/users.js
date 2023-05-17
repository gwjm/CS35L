const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
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

// TODO: Create route to delete a user from the database and delete any of their owned projects

module.exports = router;