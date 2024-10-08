require('dotenv').config();
const axios = require('axios');
const BASE_URL = process.env.DATABASE_API_URL;

async function createUser(userData) {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : 'No response data'
        });
        throw error;
    }
}

async function deleteAllUsers() {
    try {
        // Fetch all users
        const users = await getAllUsers();
        
        // Delete each user
        const deletePromises = users.map(user => {
            return deleteUserById(user.userId);
        });
        
        // Wait for all deletions to complete
        const results = await Promise.all(deletePromises);
        console.log('All users deleted:', results);
    } catch (error) {
        console.error('Error deleting all users:', error);
    }
}


async function getAllUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateUserById(userId, userData) {
    try {
        const response = await axios.patch(`${BASE_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteUserById(userId) {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Job Offer API Functions
async function createJobOffer(jobOfferData) {
    try {
        const response = await axios.post(`${BASE_URL}/joboffers`, jobOfferData);
        return response.data;
    } catch (error) {
        console.error('Error creating job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getAllJobOffers() {
    try {
        const response = await axios.get(`${BASE_URL}/joboffers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job offers:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteAllJobOffers() {
    try {
        // Fetch all users
        const jobs = await getAllJobOffers();
        
        // Delete each user
        const deletePromises = jobs.map(job => {
            return deleteJobOfferById(job.jobOfferId);
        });
        
        // Wait for all deletions to complete
        const results = await Promise.all(deletePromises);
        console.log('All job offers deleted:', results);
    } catch (error) {
        console.error('Error deleting all job offers:', error);
    }
}

async function getJobOfferById(jobOfferId) {
    try {
        const response = await axios.get(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateJobOfferById(jobOfferId, jobOfferData) {
    try {
        const response = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}`, jobOfferData);
        return response.data;
    } catch (error) {
        console.error('Error updating job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteJobOfferById(jobOfferId) {
    try {
        const response = await axios.delete(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}


async function updateJobOfferApprovalStatus(jobOfferId, approvalStatus) {
    try {
        const response = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}/approve`, {
            approvalStatus: approvalStatus
        });
        return response.data;
    } catch (error) {
        console.error('Error updating job offer approval status:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function bulkApproveJobOfferStatus(jobOfferIds, faculty) {
    try {
        // Map over jobOfferIds and call updateJobOfferApprovalStatus for each
        const updatePromises = jobOfferIds.map(jobOfferId => {
            return approveJobOfferUnapprovedById(jobOfferId, faculty);
        });
        // Await all update requests
        const results = await Promise.all(updatePromises);
        // Log and return results
        console.log(`${faculty} job offers:`, results);
        return results;
    } catch (error) {
        console.error(`Error bulk ${faculty} job offers:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Application API Functions
async function createApplication(applicationData) {
    try {
        const response = await axios.post(`${BASE_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error creating application:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteAllApplications() {
    try {
        // Fetch all users
        const applications = await getAllApplications();

        // Delete each user
        const deletePromises = applications.map(application => {
            return deleteApplicationById(application.applicationId);
        });
        
        // Wait for all deletions to complete
        const results = await Promise.all(deletePromises);
        console.log('All applications deleted:', results);
    } catch (error) {
        console.error('Error deleting all application:', error);
    }
}

async function getAllApplications() {
    try {
        const response = await axios.get(`${BASE_URL}/applications`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getApplicationById(applicationId) {
    try {
        const response = await axios.get(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching application:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateApplicationById(applicationId, applicationData) {
    try {
        const response = await axios.patch(`${BASE_URL}/applications/${applicationId}`, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error updating application:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteApplicationById(applicationId) {
    try {
        const response = await axios.delete(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting application:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateApplicationApprovalStatus(applicationId, approvalStatus) {
    try {
        const response = await axios.patch(`${BASE_URL}/applications/${applicationId}/approve`, {
            approvalStatus: approvalStatus
        });
        return response.data;
    } catch (error) {
        console.error('Error updating application approval status:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function bulkUpdateApplicationStatus(applicationIds, approvalStatus) {
    try {
        // Validate approvalStatus
        const validStatuses = ['approved', 'rejected'];
        if (!validStatuses.includes(approvalStatus)) {
            throw new Error(`Invalid approval status: ${approvalStatus}. Must be 'approved' or 'rejected'.`);
        }

        // Map over applicationIds and call updateApplicationApprovalStatus for each
        const updatePromises = applicationIds.map(applicationId => {
            return updateApplicationApprovalStatus(applicationId, approvalStatus);
        });

        // Await all update requests
        const results = await Promise.all(updatePromises);

        // Log and return results
        console.log(`${approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)} applications:`, results);
        return results;
    } catch (error) {
        console.error(`Error bulk ${approvalStatus === 'approved' ? 'approving' : 'disapproving'} applications:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Interview API Functions
async function createInterview(interviewData) {
    try {
        const response = await axios.post(`${BASE_URL}/interviews`, interviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating interview:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getAllInterviews() {
    try {
        const response = await axios.get(`${BASE_URL}/interviews`);
        return response.data;
    } catch (error) {
        console.error('Error fetching interviews:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getInterviewById(interviewId) {
    try {
        const response = await axios.get(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching interview:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateInterviewById(interviewId, interviewData) {
    try {
        const response = await axios.patch(`${BASE_URL}/interviews/${interviewId}`, interviewData);
        return response.data;
    } catch (error) {
        console.error('Error updating interview:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteInterviewById(interviewId) {
    try {
        const response = await axios.delete(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting interview:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getUsersByFaculty(facultyy) {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            params: { facultyy }
        });
        
        // Filter the results in case the backend is not filtering correctly
        const filteredData = response.data.filter(offer => offer.faculty === facultyy);
        
        return filteredData;
    } catch (error) {
        console.error('Error fetching job offers by faculty:', error);
        throw error;
    }
}

// Get Users by Faculty

async function getJobOffersByFaculty(facultyy) {
    try {
        const response = await axios.get(`${BASE_URL}/joboffers`, {
            params: { facultyy }
        });
        
        // Filter the results in case the backend is not filtering correctly
        const filteredData = response.data.filter(offer => offer.faculty === facultyy);
        
        return filteredData;
    } catch (error) {
        console.error('Error fetching job offers by faculty:', error);
        throw error;
    }
}

// Get Users by Faculty

async function getApplicationsByFaculty(facultyy) {
    try {
        const response = await axios.get(`${BASE_URL}/applications`, {
            params: { facultyy }
        });
        
        // Filter the results in case the backend is not filtering correctly
        const filteredData = response.data.filter(offer => offer.faculty === facultyy);
        
        return filteredData;
    } catch (error) {
        console.error('Error fetching job offers by faculty:', error);
        throw error;
    }
}

// Get Interviews by Faculty
async function getInterviewsByFaculty(facultyy) {
    try {
        const response = await axios.get(`${BASE_URL}/interviews`, {
            params: { facultyy }
        });
        
        // Filter the results in case the backend is not filtering correctly
        const filteredData = response.data.filter(offer => offer.faculty === facultyy);
        
        return filteredData;
    } catch (error) {
        console.error('Error fetching job offers by faculty:', error);
        throw error;
    }
}

async function deleteAllInterviews() {
    try {
        // Fetch all users
        const interviews = await getAllInterviews();

        // Delete each user
        const deletePromises = interviews.map(interview => {
            return deleteInterviewById(interview.interviewId);
        });
        
        // Wait for all deletions to complete
        const results = await Promise.all(deletePromises);
        console.log('All interviews deleted:', results);
    } catch (error) {
        console.error('Error deleting all interviews:', error);
    }
}


// Job Offer API Functions
async function createJobOfferUnapproved(jobOfferData) {
    try {
        const response = await axios.post(`${BASE_URL}/joboffersUnapproved`, jobOfferData);
        return response.data;
    } catch (error) {
        console.error('Error creating job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}


async function getAllJobOffersUnapproved() {
    try {
        const response = await axios.get(`${BASE_URL}/joboffersUnapproved`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job offers:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteAllJobOffersUnapproved() {
    try {
        // Fetch all users
        const jobs = await getAllJobOffersUnapproved();
        
        // Delete each user
        const deletePromises = jobs.map(job => {
            return deleteJobOfferUnapprovedById(job.jobOfferId);
        });
        
        // Wait for all deletions to complete
        const results = await Promise.all(deletePromises);
        console.log('All job offers deleted:', results);
    } catch (error) {
        console.error('Error deleting all job offers:', error);
    }
}

async function getJobOfferUnapprovedById(jobOfferId) {
    try {
        const response = await axios.get(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function approveJobOfferUnapprovedById(jobOfferId, Faculty) {
    try {
        // Fetch the unapproved job offer by ID
        const response = await axios.get(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`);
        
        // Update the faculty field in the fetched job offer
        const newJobOffer = {
            jobTitle: response.data["jobTitle"],
            jobDescription: response.data["jobDescription"],
            faculty: Faculty,
            jobType: response.data["jobType"],
            jobLocation: response.data["jobLocation"],
            companyId: response.data["companyId"],
            approvalStatus: 'approved',
            additionalInfos: response.data["additionalInfos"]
        };
        
        // Create a new job offer with the updated data
        const response2 = await createJobOffer(newJobOffer);
        
        // Return the newly created job offer data
        return response2.data;
    
    } catch (error) {
        console.error('Error fetching job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function updateJobOfferUnapprovedById(jobOfferId, jobOfferData) {
    try {
        const response = await axios.patch(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`, jobOfferData);
        return response.data;
    } catch (error) {
        console.error('Error updating job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function deleteJobOfferUnapprovedById(jobOfferId) {
    try {
        const response = await axios.delete(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job offer:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Exporting the functions
module.exports = {
    // User API
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteAllUsers,
    getUsersByFaculty,
    
    // Job Offer API
    createJobOffer,
    getAllJobOffers,
    getJobOfferById,
    updateJobOfferById,
    deleteJobOfferById,
    deleteAllJobOffers,
    getJobOffersByFaculty,
    updateJobOfferApprovalStatus,
    
    // Application API
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById,
    deleteAllApplications,
    getApplicationsByFaculty,
    updateApplicationApprovalStatus,
    bulkUpdateApplicationStatus,

    // Interview API
    createInterview,
    getAllInterviews,
    getInterviewById,
    updateInterviewById,
    deleteInterviewById,
    deleteAllInterviews,
    getInterviewsByFaculty,

    // JobOffer Unapproved API
    createJobOfferUnapproved,
    getAllJobOffersUnapproved,
    deleteAllJobOffersUnapproved,
    getJobOfferUnapprovedById,
    approveJobOfferUnapprovedById,
    updateJobOfferUnapprovedById,
    deleteJobOfferUnapprovedById,
    deleteJobOfferUnapprovedById,
    bulkApproveJobOfferStatus,

};
