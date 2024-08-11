const Application = require('../models/applicationSchema');

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).send(application);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all applications
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).send(applications);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an application by applicationId
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findOne({ applicationId: req.params.id });
        if (!application) {
            return res.status(404).send({ message: 'Application not found' });
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update an application by applicationId
exports.updateApplicationById = async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate(
            { applicationId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).send({ message: 'Application not found' });
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an application by applicationId
exports.deleteApplicationById = async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({ applicationId: req.params.id });
        if (!application) {
            return res.status(404).send({ message: 'Application not found' });
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update approval status of an application
exports.updateApprovalStatus = async (req, res) => {
    try {
        const { approvalStatus } = req.body;
        if (!['approved', 'rejected'].includes(approvalStatus)) {
            return res.status(400).send({ error: 'Invalid approval status' });
        }
        const application = await Application.findOneAndUpdate(
            { applicationId: req.params.id },
            { approvalStatus },
            { new: true, runValidators: true }
        );
        if (!application) {
            return res.status(404).send({ message: 'Application not found' });
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(400).send(error);
    }
};
