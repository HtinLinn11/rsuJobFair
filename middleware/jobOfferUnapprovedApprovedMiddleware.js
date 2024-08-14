// Middleware to validate incoming data for creating or updating a job offer
exports.validateJobOfferData = (req, res, next) => {
    const { companyId, jobTitle, jobDescription, jobType, jobLocation, faculty } = req.body;
    
    if (!companyId || !jobTitle || !jobDescription || !jobType || !jobLocation || !faculty) {
        return res.status(400).send({ message: 'Company ID, job title, job description, and job type are required' });
    }

    // Additional validation can be added here
    
    next();
};
