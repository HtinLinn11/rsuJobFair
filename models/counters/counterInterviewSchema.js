const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
        unique: true
    },
    sequence_value: {
        type: Number,
        default: 0
    }
});

const CounterInterview = mongoose.model('_CounterInterview', CounterSchema);
module.exports = CounterInterview;
