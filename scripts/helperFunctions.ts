import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL: string = process.env.DATABASE_API_URL || '';

// Type definitions
interface User {
    userId: number;
    [key: string]: any; // Add more specific fields as needed
}

interface JobOffer {
    jobOfferId: number;
    companyId: number;
    jobTitle: string;
    jobDescription: string;
    faculty: string;
    jobType: string;
    jobLocation: string;
    approvalStatus: string;
    additionalInfos: string;
}

interface Application {
    applicationId: number;
    [key: string]: any; // Add more specific fields as needed
}

interface Interview {
    interviewId: number;
    [key: string]: any; // Add more specific fields as needed
}

interface UnapprovedJobOffer {
    jobOfferId: number;
    jobTitle: string;
    jobDescription: string;
    faculty: string;
    jobType: string;
    jobLocation: string;
    companyId: number;
    approvalStatus: string;
    additionalInfos: string;
}

// Generic error handling function
function handleAxiosError(error: any): void {
    console.error('Error:', {
        message: error.message,
        response: error.response ? {
            status: error.response.status,
            data: error.response.data
        } : 'No response data'
    });
    throw error;
}

// User API Functions
async function createUser(userData: User): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getAllUsers(): Promise<User[]> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getUserById(userId: number): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateUserById(userId: number, userData: Partial<User>): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.patch(`${BASE_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteUserById(userId: number): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.delete(`${BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteAllUsers(): Promise<void> {
    try {
        const users: User[] = await getAllUsers();
        const deletePromises = users.map(user => deleteUserById(user.userId));
        await Promise.all(deletePromises);
        console.log('All users deleted.');
    } catch (error) {
        handleAxiosError(error);
    }
}

// Job Offer API Functions
async function createJobOffer(jobOfferData: JobOffer): Promise<JobOffer> {
    try {
        const response: AxiosResponse<JobOffer> = await axios.post(`${BASE_URL}/joboffers`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getAllJobOffers(): Promise<JobOffer[]> {
    try {
        const response: AxiosResponse<JobOffer[]> = await axios.get(`${BASE_URL}/joboffers`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getJobOfferById(jobOfferId: number): Promise<JobOffer> {
    try {
        const response: AxiosResponse<JobOffer> = await axios.get(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateJobOfferById(jobOfferId: number, jobOfferData: Partial<JobOffer>): Promise<JobOffer> {
    try {
        const response: AxiosResponse<JobOffer> = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}`, jobOfferData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteJobOfferById(jobOfferId: number): Promise<JobOffer> {
    try {
        const response: AxiosResponse<JobOffer> = await axios.delete(`${BASE_URL}/joboffers/${jobOfferId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteAllJobOffers(): Promise<void> {
    try {
        const jobs: JobOffer[] = await getAllJobOffers();
        const deletePromises = jobs.map(job => deleteJobOfferById(job.jobOfferId));
        await Promise.all(deletePromises);
        console.log('All job offers deleted.');
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateJobOfferApprovalStatus(jobOfferId: number, approvalStatus: string): Promise<JobOffer> {
    try {
        const response: AxiosResponse<JobOffer> = await axios.patch(`${BASE_URL}/joboffers/${jobOfferId}/approve`, {
            approvalStatus
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function bulkApproveJobOfferStatus(jobOfferIds: number[], faculty: string): Promise<JobOffer[]> {
    try {
        const updatePromises = jobOfferIds.map(jobOfferId => approveJobOfferUnapprovedById(jobOfferId, faculty));
        const results = await Promise.all(updatePromises);
        console.log(`${faculty} job offers:`, results);
        return results;
    } catch (error) {
        handleAxiosError(error);
    }
}

// Application API Functions
async function createApplication(applicationData: Application): Promise<Application> {
    try {
        const response: AxiosResponse<Application> = await axios.post(`${BASE_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getAllApplications(): Promise<Application[]> {
    try {
        const response: AxiosResponse<Application[]> = await axios.get(`${BASE_URL}/applications`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getApplicationById(applicationId: number): Promise<Application> {
    try {
        const response: AxiosResponse<Application> = await axios.get(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateApplicationById(applicationId: number, applicationData: Partial<Application>): Promise<Application> {
    try {
        const response: AxiosResponse<Application> = await axios.patch(`${BASE_URL}/applications/${applicationId}`, applicationData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteApplicationById(applicationId: number): Promise<Application> {
    try {
        const response: AxiosResponse<Application> = await axios.delete(`${BASE_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteAllApplications(): Promise<void> {
    try {
        const applications: Application[] = await getAllApplications();
        const deletePromises = applications.map(application => deleteApplicationById(application.applicationId));
        await Promise.all(deletePromises);
        console.log('All applications deleted.');
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateApplicationApprovalStatus(applicationId: number, approvalStatus: string): Promise<Application> {
    try {
        const response: AxiosResponse<Application> = await axios.patch(`${BASE_URL}/applications/${applicationId}/approve`, {
            approvalStatus
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function bulkUpdateApplicationStatus(applicationIds: number[], approvalStatus: string): Promise<Application[]> {
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
        handleAxiosError(error);
    }
}

// Interview API Functions
async function createInterview(interviewData: Interview): Promise<Interview> {
    try {
        const response: AxiosResponse<Interview> = await axios.post(`${BASE_URL}/interviews`, interviewData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getAllInterviews(): Promise<Interview[]> {
    try {
        const response: AxiosResponse<Interview[]> = await axios.get(`${BASE_URL}/interviews`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function getInterviewById(interviewId: number): Promise<Interview> {
    try {
        const response: AxiosResponse<Interview> = await axios.get(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function updateInterviewById(interviewId: number, interviewData: Partial<Interview>): Promise<Interview> {
    try {
        const response: AxiosResponse<Interview> = await axios.patch(`${BASE_URL}/interviews/${interviewId}`, interviewData);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteInterviewById(interviewId: number): Promise<Interview> {
    try {
        const response: AxiosResponse<Interview> = await axios.delete(`${BASE_URL}/interviews/${interviewId}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

async function deleteAllInterviews(): Promise<void> {
    try {
        const interviews: Interview[] = await getAllInterviews();
        const deletePromises = interviews.map(interview => deleteInterviewById(interview.interviewId));
        await Promise.all(deletePromises);
        console.log('All interviews deleted.');
    } catch (error) {
        handleAxiosError(error);
    }
}

