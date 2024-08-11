const mongoose = require('mongoose');
const Counter = require('./counters/counterInterviewSchema'); // Adjust path if necessary

const InterviewSchema = new mongoose.Schema({
    interviewId: {
        type: Number,
        unique: true,
        required: false
    },
    companyId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    applicationId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    studentId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    interviewTime: {
        type: Date,
        default: Date.now, // Set default to the current date and time
    },
    interviewLocation: {
        type: String,
        default: 'Coming Soon' // Default value for interview location
    },
    faculty: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled' // Default status is scheduled
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save middleware to set auto-incremented interviewId
InterviewSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'Interview' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.interviewId = counter.sequence_value;
    }
    next();
});

const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = Interview;
