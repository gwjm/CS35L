const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  owner: { 
    //[mongoose.schema.Types.ObjectId]
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: {
    type: Date, 
    required: true 
  },
  // members: { 
  //   //[mongoose.schema.Types.ObjectId]
  //   type: String, 
  //   required: true 
  // },
  //other possible attributes: deadline, permissions, members,
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;