const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const applicationMiddleware = require('../middleware/applicationMiddleware');

// Create a new application
router.post('/applications', applicationMiddleware.validateApplicationData, applicationController.createApplication);

// Get all applications
router.get('/applications', applicationController.getAllApplications);

// Get an application by applicationId
router.get('/applications/:id', applicationController.getApplicationById);

// Update an application by applicationId
router.patch('/applications/:id', applicationMiddleware.validateApplicationData, applicationController.updateApplicationById);

// Delete an application by applicationId
router.delete('/applications/:id', applicationController.deleteApplicationById);

// Update approval status of an application
router.patch('/applications/:id/approve', applicationController.updateApprovalStatus);

module.exports = router;
