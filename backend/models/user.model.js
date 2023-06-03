const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {    
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  ownedprojects: {
    type: [mongoose.SchemaType.ObjectId],
    ref: 'Project'
  },
  joinedprojects: {
    type: [mongoose.SchemaType.ObjectId],
    ref: 'Project'
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
}, {
 timestamps: true,
});

// Add a virtual property to get the array of friends
userSchema.virtual('friendList', {
  ref: 'User',
  localField: 'friends',
  foreignField: '_id',
  justOne: false,
  options: { unique: true } // Add this line

});

// Apply population to the owner field when querying
userSchema.pre('findOne', populateVirtuals);
userSchema.pre('find', populateVirtuals);
userSchema.pre('findOneAndUpdate', populateVirtuals);
userSchema.pre('update', populateVirtuals);

function populateVirtuals(next) {
  this.populate('friendList');
  next();
}

const User = mongoose.model('User', userSchema);

module.exports = User;