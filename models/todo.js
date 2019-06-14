const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: String,
})

mongoose.model('todo', todoSchema);