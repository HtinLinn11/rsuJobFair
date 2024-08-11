// Middleware to validate incoming data for creating or updating an application
exports.validateApplicationData = (req, res, next) => {
    const { jobOfferId, studentId, resumeURL, approvalStatus } = req.body;
    
    if (!jobOfferId || !studentId || !resumeURL) {
        return res.status(400).send({ message: 'Job offer ID, student ID, and resume URL are required' });
    }

    if (approvalStatus && !['pending', 'approved', 'rejected'].includes(approvalStatus)) {
        return res.status(400).send({ error: 'Invalid approval status' });
    }

    // Additional validation can be added here

    next();
};
