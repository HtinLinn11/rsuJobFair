import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const BASE_URL = process.env.DATABASE_API_URL as string;

// Define types
interface UserData {
    userId: number;
    [key: string]: any; // Adjust according to your actual user data structure
}

interface JobOfferData {
    jobOfferId?: number;
    companyId: number;
    jobTitle: string;
    jobDescription: string;
    faculty: string;
    jobType: string;
    jobLocation: string;
    approvalStatus: string;
    additionalInfos?: string;
}

interface ApplicationData {
    applicationId?: number;
    [key: string]: any; // Adjust according to your actual application data structure
}

interface InterviewData {
    interviewId?: number;
    [key: string]: any; // Adjust according to your actual interview data structure
}

// User API Functions
async function createUser(userData: UserData): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating user');
    }
}

async function deleteAllUsers(): Promise<void> {
    try {
        const users = await getAllUsers();
        const deletePromises = users.map(user => deleteUserById(user.userId));
        const results = await Promise.all(deletePromises);
        console.log('All users deleted:', results);
    } catch (error) {
        console.error('Error deleting all users:', error);
    }
}

async function getAllUsers(): Promise<UserData[]> {
    try {
        const response: AxiosResponse<UserData[]> = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching users');
    }
}

async function getUserById(userId: number): Promise<UserData> {
    try {
        const response: AxiosResponse<UserData> = await axios.get(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching user');
    }
}

async function updateUserById(userId: number, userData: Partial<UserData>): Promise<UserData> {
    try {
        const response: AxiosResponse<UserData> = await axios.patch(`${BASE_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating user');
    }
}

async function deleteUserById(userId: number): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'deleting user');
    }
}

// Job Offer API Functions
async function createJobOffer(jobOfferData: JobOfferData): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/joboffers`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating job offer');
    }
}

async function getAllJobOffers(): Promise<JobOfferData[]> {
    try {
        const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/joboffers`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching job offers');
    }
}

async function deleteAllJobOffers(): Promise<void> {
    try {
        const jobs = await getAllJobOffers();
        const deletePromises = jobs.map(job => deleteJobOfferById(job.jobOfferId!));
        const results = await Promise.all(deletePromises);
        console.log('All job offers deleted:', results);
    } catch (error) {
        console.error('Error deleting all job offers:', error);
    }
}

async function getJobOfferById(jobOfferId: number): Promise<JobOfferData> {
    try {
        const response: AxiosResponse<JobOfferData> = await axios.get(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching job offer');
    }
}

async function updateJobOfferById(jobOfferId: number, jobOfferData: Partial<JobOfferData>): Promise<JobOfferData> {
    try {
        const response: AxiosResponse<JobOfferData> = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating job offer');
    }
}

async function deleteJobOfferById(jobOfferId: number): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'deleting job offer');
    }
}

async function updateJobOfferApprovalStatus(jobOfferId: number, approvalStatus: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}/approve`, { approvalStatus });
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating job offer approval status');
    }
}

async function bulkApproveJobOfferStatus(jobOfferIds: number[], faculty: string): Promise<any[]> {
    try {
        const updatePromises = jobOfferIds.map(jobOfferId => approveJobOfferUnapprovedById(jobOfferId, faculty));
        const results = await Promise.all(updatePromises);
        console.log(`${faculty} job offers:`, results);
        return results;
    } catch (error) {
        console.error(`Error bulk ${faculty} job offers:`, error);
        throw error;
    }
}

// Application API Functions
async function createApplication(applicationData: ApplicationData): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating application');
    }
}

async function deleteAllApplications(): Promise<void> {
    try {
        const applications = await getAllApplications();
        const deletePromises = applications.map(application => deleteApplicationById(application.applicationId!));
        const results = await Promise.all(deletePromises);
        console.log('All applications deleted:', results);
    } catch (error) {
        console.error('Error deleting all applications:', error);
    }
}

async function getAllApplications(): Promise<ApplicationData[]> {
    try {
        const response: AxiosResponse<ApplicationData[]> = await axios.get(`${BASE_URL}/applications`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching applications');
    }
}

async function getApplicationById(applicationId: number): Promise<ApplicationData> {
    try {
        const response: AxiosResponse<ApplicationData> = await axios.get(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching application');
    }
}

async function updateApplicationById(applicationId: number, applicationData: Partial<ApplicationData>): Promise<ApplicationData> {
    try {
        const response: AxiosResponse<ApplicationData> = await axios.patch(`${BASE_URL}/applications/${applicationId}`, applicationData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating application');
    }
}

async function deleteApplicationById(applicationId: number): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'deleting application');
    }
}

async function updateApplicationApprovalStatus(applicationId: number, approvalStatus: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.patch(`${BASE_URL}/applications/${applicationId}/approve`, { approvalStatus });
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating application approval status');
    }
}

async function bulkUpdateApplicationStatus(applicationIds: number[], approvalStatus: string): Promise<any[]> {
    try {
        const validStatuses = ['approved', 'rejected'];
        if (!validStatuses.includes(approvalStatus)) {
            throw new Error(`Invalid approval status: ${approvalStatus}. Must be 'approved' or 'rejected'.`);
        }

        const updatePromises = applicationIds.map(applicationId => updateApplicationApprovalStatus(applicationId, approvalStatus));
        const results = await Promise.all(updatePromises);
        console.log(`${approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)} applications:`, results);
        return results;
    } catch (error) {
        console.error(`Error bulk ${approvalStatus} applications:`, error);
        throw error;
    }
}

// Interview API Functions
async function createInterview(interviewData: InterviewData): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/interviews`, interviewData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating interview');
    }
}

async function getAllInterviews(): Promise<InterviewData[]> {
    try {
        const response: AxiosResponse<InterviewData[]> = await axios.get(`${BASE_URL}/interviews`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching interviews');
    }
}

async function deleteAllInterviews(): Promise<void> {
    try {
        const interviews = await getAllInterviews();
        const deletePromises = interviews.map(interview => deleteInterviewById(interview.interviewId!));
        const results = await Promise.all(deletePromises);
        console.log('All interviews deleted:', results);
    } catch (error) {
        console.error('Error deleting all interviews:', error);
    }
}

async function getInterviewById(interviewId: number): Promise<InterviewData> {
    try {
        const response: AxiosResponse<InterviewData> = await axios.get(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching interview');
    }
}

async function updateInterviewById(interviewId: number, interviewData: Partial<InterviewData>): Promise<InterviewData> {
    try {
        const response: AxiosResponse<InterviewData> = await axios.patch(`${BASE_URL}/interviews/${interviewId}`, interviewData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating interview');
    }
}

async function deleteInterviewById(interviewId: number): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'deleting interview');
    }
}

// Job Offer Unapproved API Functions
async function createJobOfferUnapproved(jobOfferData: JobOfferData): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/joboffersUnapproved`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'creating unapproved job offer');
    }
}

async function getAllJobOffersUnapproved(): Promise<JobOfferData[]> {
    try {
        const response: AxiosResponse<JobOfferData[]> = await axios.get(`${BASE_URL}/joboffersUnapproved`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching unapproved job offers');
    }
}

async function deleteAllJobOffersUnapproved(): Promise<void> {
    try {
        const jobOffers = await getAllJobOffersUnapproved();
        const deletePromises = jobOffers.map(job => deleteJobOfferUnapprovedById(job.jobOfferId!));
        const results = await Promise.all(deletePromises);
        console.log('All unapproved job offers deleted:', results);
    } catch (error) {
        console.error('Error deleting all unapproved job offers:', error);
    }
}

async function getJobOfferUnapprovedById(jobOfferId: number): Promise<JobOfferData> {
    try {
        const response: AxiosResponse<JobOfferData> = await axios.get(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'fetching unapproved job offer');
    }
}

async function updateJobOfferUnapprovedById(jobOfferId: number, jobOfferData: Partial<JobOfferData>): Promise<JobOfferData> {
    try {
        const response: AxiosResponse<JobOfferData> = await axios.patch(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'updating unapproved job offer');
    }
}

async function deleteJobOfferUnapprovedById(jobOfferId: number): Promise<any> {
    try {
        const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/joboffersUnapproved/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'deleting unapproved job offer');
    }
}

async function approveJobOfferUnapprovedById(jobOfferId: number, faculty: string): Promise<any> {
    try {
        const jobOffer = await getJobOfferUnapprovedById(jobOfferId);
        const newJobOffer = { ...jobOffer, faculty, approvalStatus: 'approved' };
        return createJobOffer(newJobOffer);
    } catch (error) {
        handleAxiosError(error, 'approving unapproved job offer');
    }
}

// Helper function for error handling
function handleAxiosError(error: any, context: string): void {
    console.error(`${context}:`, {
        message: error.message,
        response: error.response ? {
            status: error.response.status,
            data: error.response.data
        } : 'No response data'
    });
}

// Exporting the functions
export {
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
    updateJobOfferApprovalStatus,
    bulkApproveJobOfferStatus,
    getJobOffersByFaculty,

    // Application API
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationById,
    deleteApplicationById,
    deleteAllApplications,
    updateApplicationApprovalStatus,
    bulkUpdateApplicationStatus,
    getApplicationsByFaculty,

    // Interview API
    createInterview,
    getAllInterviews,
    getInterviewById,
    updateInterviewById,
    deleteInterviewById,
    deleteAllInterviews,
    getInterviewsByFaculty,

    // Job Offer Unapproved API
    createJobOfferUnapproved,
    getAllJobOffersUnapproved,
    getJobOfferUnapprovedById,
    updateJobOfferUnapprovedById,
    deleteJobOfferUnapprovedById,
    deleteAllJobOffersUnapproved,
    approveJobOfferUnapprovedById
};
