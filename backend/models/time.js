const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TimeSchema = new Schema({
    username: { type: String, required: true },
    time: { type: String, required: true },
    value: { type: Number, required: true},
});

module.exports = mongoose.model("Time", TimeSchema);