const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    assignedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
})

const Task = mongoose.model('Tasks', taskSchema)

module.exports = Task;