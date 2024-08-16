// Middleware to validate incoming data for creating or updating a job offer
exports.validateJobOfferData = (req, res, next) => {
    const { companyId, jobTitle, jobDescription, jobType, jobLocation } = req.body;
    
    // Check for missing fields
    if (!companyId || !jobTitle || !jobDescription || !jobType || !jobLocation) {
        return res.status(400).send({
            message: "Missing required fields",
            missingFields: {
                companyId: !companyId ? "companyId is required" : undefined,
                jobTitle: !jobTitle ? "jobTitle is required" : undefined,
                jobDescription: !jobDescription ? "jobDescription is required" : undefined,
                jobType: !jobType ? "jobType is required" : undefined,
                jobLocation: !jobLocation ? "jobLocation is required" : undefined
            }
        });
    }

    // Additional validation can be added here
    
    next();
};
