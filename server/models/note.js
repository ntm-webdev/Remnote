const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    type: String
});

const userSchema = new mongoose.Schema({
    name: String,
    notes: [noteSchema]
});

const note = mongoose.model('note', userSchema);
module.exports = note;