const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    //minlength: 3
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project'
  },
  joinedprojects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project'
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectID],
    ref: 'User'
  }
}, 
{
 timestamps: true,
}
);

userSchema.virtual('friendList', {
  ref: 'User',
  localField: 'friends',
  foreignField: '_id',
  justOne: false
});

function populateVirtuals(next) {
  this.populate({path: 'friends', model: 'User'})
  next();
}

userSchema.pre('findOne', populateVirtuals);
userSchema.pre('find', populateVirtuals);
userSchema.pre('findOneAndUpdate', populateVirtuals);
userSchema.pre('update', populateVirtuals);

const User = mongoose.model('User', userSchema);

module.exports = User;