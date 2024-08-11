const User = require('../models/userSchema');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a user by userId
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a user by userId
exports.updateUserById = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user by userId
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};
