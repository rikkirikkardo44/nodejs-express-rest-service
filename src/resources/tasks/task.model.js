const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: null
    },
    params: {
      isPrior: Boolean,
      isDone: Boolean
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { _id, ...rest } = task;
  return { id: _id, ...rest };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
