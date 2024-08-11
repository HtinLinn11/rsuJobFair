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

const CounterApplication = mongoose.model('_CounterApplication', CounterSchema);
module.exports = CounterApplication;
