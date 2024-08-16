require('dotenv').config();
const { 
    createUser, deleteAllUsers,
    createJobOffer, deleteAllJobOffers, bulkUpdateJobOfferStatus, getAllJobOffers,
    createApplication, deleteAllApplications, bulkUpdateApplicationStatus,
    createInterview , deleteAllInterviews,
    createJobOfferUnapproved, deleteAllJobOffersUnapproved, approveJobOfferUnapprovedById, getAllJobOffersUnapproved,
    getJobOffersByFaculty
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



