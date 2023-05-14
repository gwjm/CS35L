const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String, required: true },
  date: {type: Date, required: true },
  //other possible attributes: deadline, permissions, members, 
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;