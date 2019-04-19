const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    todoType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);