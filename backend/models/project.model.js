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
  deadline: {
    type: Date,
    default: () => Date.now()
  },
  members: [mongoose.Schema.Types.ObjectId]

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

// Apply population to the owner field when querying
projectSchema.pre('findOne', populateOwner);
projectSchema.pre('find', populateOwner);
projectSchema.pre('findOneAndUpdate', populateOwner);
projectSchema.pre('update', populateOwner);

function populateOwner(next) {
  this.populate('ownerUsername');
  next();
}

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
