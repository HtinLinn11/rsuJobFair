const mongoose = require('mongoose');
const CounterJobOffer = require('./counters/counterJobOfferSchema'); // Adjust the path if necessary

const JobOfferSchema = new mongoose.Schema({
    jobOfferId: {
        type: Number,
        unique: true,
        required: false // Optional, as it will be auto-generated
    },
    companyId: {
        type: Number,
        ref: 'User', // Assuming 'User' is the model name for users
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // Default status is pending
    },
    additionalInfos: {
        type: String,
        required: false
    }
}, 
{ 
    timestamps: true
});

// Pre-save middleware to set auto-incremented jobOfferId
JobOfferSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await CounterJobOffer.findOneAndUpdate(
            { modelName: 'JobOffer' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.jobOfferId = counter.sequence_value;
    }
    next();
});

const JobOffer = mongoose.model('JobOffer', JobOfferSchema);
module.exports = JobOffer;
