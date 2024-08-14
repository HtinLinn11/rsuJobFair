const express = require('express');
const router = express.Router();
const jobOfferUnapprovedController = require('../controllers/jobOfferUnapprovedController.js');
const jobOfferUnapprovedMiddleware = require('../middleware/jobOfferUnapprovedApprovedMiddleware.js');

// Create a new job offer
router.post('/joboffersUnapproved', jobOfferUnapprovedMiddleware.validateJobOfferData, jobOfferUnapprovedController.createJobOfferUnapproved);

// Get all job offers
router.get('/joboffersUnapproved', jobOfferUnapprovedController.getAllJobOffersUnapproved);

// Get a job offer by jobOfferId
router.get('/joboffersUnapproved/:id', jobOfferUnapprovedController.getJobOfferUnapprovedById);

// Update a job offer by jobOfferId
router.patch('/joboffersUnapproved/:id', jobOfferUnapprovedMiddleware.validateJobOfferData, jobOfferUnapprovedController.updateJobOfferUnapprovedById);

// Approve or reject a job offer
router.patch('/joboffersUnapproved/:id/approve', jobOfferUnapprovedController.updateJobOfferUnapprovedApprovalStatus);

// Delete a job offer by jobOfferId
router.delete('/joboffersUnapproved/:id', jobOfferUnapprovedController.deleteJobOfferUnapprovedById);

module.exports = router;
