const express = require('express');
const router = express.Router();
const jobOfferController = require('../controllers/jobOfferController');
const jobOfferMiddleware = require('../middleware/jobOfferMiddleware');

// Create a new job offer
router.post('/joboffers', jobOfferMiddleware.validateJobOfferData, jobOfferController.createJobOffer);

// Get all job offers
router.get('/joboffers', jobOfferController.getAllJobOffers);

// Get a job offer by jobOfferId
router.get('/joboffers/:id', jobOfferController.getJobOfferById);

// Update a job offer by jobOfferId
router.patch('/joboffers/:id', jobOfferMiddleware.validateJobOfferData, jobOfferController.updateJobOfferById);

// Approve or reject a job offer
router.patch('/joboffers/:id/approve', jobOfferController.updateJobOfferApprovalStatus);

// Delete a job offer by jobOfferId
router.delete('/joboffers/:id', jobOfferController.deleteJobOfferById);

module.exports = router;