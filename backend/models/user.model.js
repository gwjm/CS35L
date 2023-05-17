const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
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
    unique: true,
    trim: true
  },
  ownedprojects: {
    //[mongoose.schema.Types.ObjectId]
    type: String,
    ref: 'Project'
  },
  joinedprojects: {
    //[mongoose.schema.Types.ObjectId]
    type: String,
    ref: 'Project'
  }
}, 
//{
//  timestamps: true,
//}
);

const User = mongoose.model('User', userSchema);

module.exports = User;