const mongoose = require('mongoose');
const CounterUser = require('./counters/counterUserSchema'); // Adjust the path if necessary

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: false // Optional, as it will be auto-generated
    },
    userType: {
        type: String,
        enum: ['admin', 'student', 'company', 'ajarn'],
        required: true
    },
    username: {
        type: String,
        unique: false,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    faculty: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: false
    }
}, 
{ 
    timestamps: true
});

// Pre-save middleware to set auto-incremented userId
UserSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await CounterUser.findOneAndUpdate(
            { modelName: 'User' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.userId = counter.sequence_value;
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
