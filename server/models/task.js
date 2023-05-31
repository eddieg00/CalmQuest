const { Schema, model } = require('mongoose');

const taskSchema = new Schema ({
    task: {
        type: String,
        required: true,
    },
});

const Task = model('Task', taskSchema);

module.exports = Task;