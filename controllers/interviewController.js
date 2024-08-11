const Interview = require('../models/interviewSchema.js');

// Create a new interview
exports.createInterview = async (req, res) => {
    try {
        const interview = new Interview(req.body);
        await interview.save();
        res.status(201).send(interview);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all interviews
exports.getAllInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.status(200).send(interviews);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an interview by ID
exports.getInterviewById = async (req, res) => {
    try {
        const interview = await Interview.findOne({ interviewId: req.params.id });
        if (!interview) {
            return res.status(404).send({ message: 'Interview not found' });
        }
        res.status(200).send(interview);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an interview by ID
exports.updateInterviewById = async (req, res) => {
    try {
        const interview = await Interview.findOneAndUpdate(
            { interviewId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!interview) {
            return res.status(404).send({ message: 'Interview not found' });
        }
        res.status(200).send(interview);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an interview by ID
exports.deleteInterviewById = async (req, res) => {
    try {
        const interview = await Interview.findOneAndDelete({ interviewId: req.params.id });
        if (!interview) {
            return res.status(404).send({ message: 'Interview not found' });
        }
        res.status(200).send(interview);
    } catch (error) {
        res.status(500).send(error);
    }
};
