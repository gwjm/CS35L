const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    status: {
        type: Number, 
        default: 0,
        required: true
    },
    assignedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    //TODO: Need to change this to work with object IDs later
    // assignedUsers: {
    //     type: []
    // },
})

taskSchema.virtual('assignedUserList', {
    ref: 'User',
    localField: 'assignedUsers',
    foreignField: '_id',
    justOne: false
});

taskSchema.pre('findOne', populateVirtuals);

function populateVirtuals(next) {
    this.populate('assignedUsers')
    next();
}

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;