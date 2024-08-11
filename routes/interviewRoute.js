const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// Create a new interview
router.post('/interviews', interviewController.createInterview);

// Get all interviews
router.get('/interviews', interviewController.getAllInterviews);

// Get an interview by ID
router.get('/interviews/:id', interviewController.getInterviewById);

// Update an interview by ID
router.patch('/interviews/:id', interviewController.updateInterviewById);

// Delete an interview by ID
router.delete('/interviews/:id', interviewController.deleteInterviewById);

module.exports = router;
