require('dotenv').config();
const { 
    createUser, deleteAllUsers,
    createJobOffer, deleteAllJobOffers, bulkUpdateJobOfferStatus,
    createApplication, deleteAllApplications, bulkUpdateApplicationStatus,
    createInterview , deleteAllInterviews,
    createJobOfferUnapproved, deleteAllJobOffersUnapproved, approveJobOfferUnapprovedById
} = require('./helperFunctions'); // Adjust the path if necessary


async function createMultipleUsers(numberOfUsers) {
    for (let i = 1; i <= numberOfUsers; i++) {
        const newUser = {
            username: `uniqueUser${i}`,
            password: 'password',
            email: `user${i}@example.com`,
            faculty: 'RSU_INTERNATIONAL_COLLEGE',
            userType: 'student'
        };

        try {
            const data = await createUser(newUser);
            console.log('User created:', data);
        } catch (err) {
            console.error('Failed to create user:', err);
        }
    }
}


async function createMultipleJobOffers(numberOfOffers) {
    for (let i = 1; i <= numberOfOffers; i++) {
        const newJobOffer = {
            jobTitle: `Job Title ${i}`,
            jobDescription: `Description for job offer ${i}`,
            faculty: 'RSU_INTERNATIONAL_COLLEGE',
            jobType: 'full-time',
            jobLocation: `Location ${i}`,
            companyId: 1,
            approvalStatus: 'pending',
            additionalInfos: `Additional info ${i}`
        };

        try {
            const data = await createJobOfferUnapproved(newJobOffer);
            console.log('Job offer created:', data);
        } catch (err) {
            console.error('Failed to create job offer:', err);
        }
    }
}

async function createMultipleApplications(numberOfApplications) {
    for (let i = 1; i <= numberOfApplications; i++) {
        const newApplication = {
            jobOfferId: i, // Assuming jobOfferId is a number. Adjust if it's different.
            studentId: i, // Assuming studentId is a number. Adjust if it's different.
            resumeURL: `http://example.com/resume${i}.pdf`,
            faculty: 'RSU_INTERNATIONAL_COLLEGE',
            approvalStatus: 'pending'
        };

        try {
            const data = await createApplication(newApplication);
            console.log('Application created:', data);
        } catch (err) {
            console.error('Failed to create application:', err);
        }
    }
}

async function createMultipleInterviews(numberOfInterviews) {
    for (let i = 1; i <= numberOfInterviews; i++) {
        const newInterview = {
            companyId: i, // Assuming companyId is a number. Adjust if it's different.
            applicationId: i, // Assuming applicationId is a number. Adjust if it's different.
            studentId: i, // Assuming studentId is a number. Adjust if it's different.
            interviewTime: new Date(), // Example date and time, adjust as needed.
            interviewLocation: `Location ${i}`, // Example location, adjust as needed.
            faculty: 'RSU_INTERNATIONAL_COLLEGE', // Example faculty, adjust as needed.
            status: 'scheduled' // Example status, adjust as needed.
        };

        try {
            const data = await createInterview(newInterview);
            console.log('Interview created:', data);
        } catch (err) {
            console.error('Failed to create interview:', err);
        }
    }
}

deleteAllUsers()
deleteAllJobOffers()
deleteAllApplications()
deleteAllInterviews()
deleteAllJobOffersUnapproved()

// Example usage: create 5 users
createMultipleUsers(5);
// Example usage: create 5 job offers
createMultipleJobOffers(5);
// Example usage: create 5 applications
createMultipleApplications(5);
// Example usage: create 5 interviews
createMultipleInterviews(5);

