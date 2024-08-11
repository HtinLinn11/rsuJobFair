const mongoose = require('mongoose');
const Counter = require('./counters/counterApplicationSchema'); // Adjust path if necessary

const ApplicationSchema = new mongoose.Schema({
    applicationId: {
        type: Number,
        unique: true,
        required: false
    },
    jobOfferId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    studentId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    resumeURL: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // Default status is pending
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save middleware to set auto-incremented applicationId
ApplicationSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'Application' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.applicationId = counter.sequence_value;
    }
    next();
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
