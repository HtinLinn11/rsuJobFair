require('dotenv').config();
const { 
    createUser, deleteAllUsers,
    createJobOffer, deleteAllJobOffers, bulkUpdateJobOfferStatus, getAllJobOffers,
    createApplication, deleteAllApplications, bulkUpdateApplicationStatus,
    createInterview , deleteAllInterviews, deleteJobOfferById,
    createJobOfferUnapproved, deleteAllJobOffersUnapproved, approveJobOfferUnapprovedById, getAllJobOffersUnapproved,
    getJobOffersByFaculty, bulkApproveJobOfferStatus
} = require('./helperFunctions'); // Adjust the path if necessary


let jobOffers;

const data = async () => {
  const result = await getJobOffersByFaculty("OFFICE_OF_ALUMNI_AND_COMMUNITY_RELATIONS");
  return result;
};

data().then(result => {
  jobOffers = result;
  console.log('Job Offers:', jobOffers);
});



