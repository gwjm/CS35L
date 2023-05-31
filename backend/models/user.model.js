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
    type: [mongoose.SchemaType.ObjectId],
    ref: 'Project'
  },
  joinedprojects: {
    type: [mongoose.SchemaType.ObjectId],
    ref: 'Project'
  },
  friends: {
    type: [mongoose.SchemaType.ObjectID],
    ref: 'User'
  }
}, 
{
 timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;