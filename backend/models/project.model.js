const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }, 

}, {
  timestamps: true,
});

// Add a virtual property to get the username of the owner
projectSchema.virtual('ownerUsername', {
  ref: 'User',
  localField: 'owner',
  foreignField: '_id',
  justOne: true,
  options: { select: 'username' }
});

// Add a virtual property to get the array of members
projectSchema.virtual('memberList', {
  ref: 'User',
  localField: 'members',
  foreignField: '_id',
  justOne: false
});

// Add a virtual property to get the array of tasks
projectSchema.virtual('taskList', {
  ref: 'Task',
  localField: 'tasklist',
  foreignField: 'projectId',
  justOne: false
});

// Apply population to the owner field when querying
projectSchema.pre('findOne', populateVirtuals);
projectSchema.pre('find', populateVirtuals);
projectSchema.pre('findOneAndUpdate', populateVirtuals);
projectSchema.pre('update', populateVirtuals);

function populateVirtuals(next) {
  this.populate('memberList')
  .populate({path: 'members', model: 'User'})
  .populate({path: 'tasklist', model: 'Task'})
  next();
}

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
