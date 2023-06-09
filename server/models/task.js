const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  trait: {
    type: Boolean,
    default: false,
  }
});

const Task = model("Task", taskSchema);

module.exports = Task;
