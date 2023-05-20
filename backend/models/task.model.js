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
    assignedUsers: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

const Task = mongoose.model('Tasks', taskSchema)

module.exports = Task;