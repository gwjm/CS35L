//https://www.youtube.com/watch?v=7CqJlxBYj-M

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const projectsRouter = require('./routes/projects');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

//allows us to pull variables defined in .env
require('dotenv').config();

//nakes app into express app, we can call functions on app
const app = express();

const port = process.env.PORT || 3001;

//middle ware
app.use(cors());
//allows for us to extract data from the request
app.use(express.json());
//this logs what the path and method was
//e.g. "/projects/add GET"
app.use((req, res, next) => {
  console.log(req.path, req.method, req.body)
  next()
})


app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);


//connnects to mongod DB
//console logs error if failed
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    //listen for requests (once connected to database)
    app.listen(process.env.PORT, () => {
        console.log('connected and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})
//command: "nodemon server" to start
//look at the axios.post line in projects.js for the actual post
//bug: for some reason when i set the port equal to 3000 i get "server not found" but with the code as is it says that connection to port 5000 is refused 