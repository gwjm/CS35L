const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  "date": {"type": Date, "required": true},
  "deadline": {"type": Date, "required": true},
  "description": {"type": String, "required": true},
  "members": {"type": Array, "required": true},
  "owner": {"type": String, "required": true},
  "permissions": {"type": Array, "required": true},
  "title": {"type": String, "required": true}
  //
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;