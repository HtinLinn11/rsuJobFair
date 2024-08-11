const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware');

// Create a new user
router.post('/users', userMiddleware.validateUserData, userController.createUser);

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by userId
router.get('/users/:userId', userController.getUserById);

// Update a user by userId
router.patch('/users/:userId', userMiddleware.validateUserData, userController.updateUserById);

// Delete a user by userId
router.delete('/users/:userId', userController.deleteUserById);

module.exports = router;
