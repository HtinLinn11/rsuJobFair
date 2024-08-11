const JobOffer = require('../models/jobOfferSchema');

// Create a new job offer
exports.createJobOffer = async (req, res) => {
    try {
        const jobOffer = new JobOffer(req.body);
        await jobOffer.save();
        res.status(201).send(jobOffer);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all job offers
exports.getAllJobOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find();
        res.status(200).send(jobOffers);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a job offer by jobOfferId
exports.getJobOfferById = async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOne({ jobOfferId: req.params.id });
        if (!jobOffer) {
            return res.status(404).send({ message: 'Job offer not found' });
        }
        res.status(200).send(jobOffer);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a job offer by jobOfferId
exports.updateJobOfferById = async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOneAndUpdate(
            { jobOfferId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!jobOffer) {
            return res.status(404).send({ message: 'Job offer not found' });
        }
        res.status(200).send(jobOffer);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a job offer by jobOfferId
exports.deleteJobOfferById = async (req, res) => {
    try {
        const jobOffer = await JobOffer.findOneAndDelete({ jobOfferId: req.params.id });
        if (!jobOffer) {
            return res.status(404).send({ message: 'Job offer not found' });
        }
        res.status(200).send(jobOffer);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateJobOfferApprovalStatus = async (req, res) => {
    const jobOfferId = req.params.id;
    const { approvalStatus } = req.body;

    if (!['approved', 'rejected'].includes(approvalStatus)) {
        return res.status(400).json({ error: 'Invalid approval status' });
    }

    try {
        const jobOffer = await JobOffer.findOneAndUpdate(
            jobOfferId,
            { approvalStatus },
            { new: true, runValidators: true }
        );

        if (!jobOffer) {
            return res.status(404).json({ error: 'Job offer not found' });
        }

        res.json(jobOffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
