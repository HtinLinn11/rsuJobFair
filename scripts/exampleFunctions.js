require('dotenv').config();
const { 
    createUser, deleteAllUsers,
    createJobOffer, deleteAllJobOffers, bulkUpdateJobOfferStatus, getAllJobOffers,
    createApplication, deleteAllApplications, bulkUpdateApplicationStatus,
    createInterview , deleteAllInterviews
} = require('./helperFunctions'); // Adjust the path if necessary

let jobOffers;

const data= async()=>{
    const result=await getAllJobOffers();
    return result
}

jobOffers=data();
console.log('Job Offers:', jobOffers);



