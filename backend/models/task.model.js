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
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    // assignedUsers: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'User'
    // },
    //TODO: Need to change this to work with object IDs later
    assignedUsers: {
        type: []
    },
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;