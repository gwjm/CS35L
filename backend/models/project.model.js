const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: mongoose.SchemaTypes.ObjectId, 
    ref: "User",
    required: false 
  },
  description: { 
    type: String, 
    required: false 
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  startDate: {
    type: Date,
    required: true,
    default: () => Date.now()
  },
  deadline: {
    type: Date,
    required: true,
    default: () => Date.now()
  },
  members: [mongoose.SchemaTypes.ObjectId]

}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;