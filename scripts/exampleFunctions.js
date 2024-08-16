require('dotenv').config();
const { 
    createUser, deleteAllUsers,
    createJobOffer, deleteAllJobOffers, bulkUpdateJobOfferStatus, getAllJobOffers,
    createApplication, deleteAllApplications, bulkUpdateApplicationStatus,
    createInterview , deleteAllInterviews,
    createJobOfferUnapproved, deleteAllJobOffersUnapproved, approveJobOfferUnapprovedById, getAllJobOffersUnapproved
} = require('./helperFunctions'); // Adjust the path if necessary


approveJobOfferUnapprovedById(1, 'OFFICE_OF_ALUMNI_AND_COMMUNITY_RELATIONS')
let jobOffers;

const data= async()=>{
    const result=await getAllJobOffers();
    return result
}

jobOffers=data();
console.log('Job Offers:', jobOffers);




