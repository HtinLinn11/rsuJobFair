exports.validateUserData = (req, res, next) => {
    const { username, email, userType, password } = req.body;
    
    if (!username || !email || !userType || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    // Additional validation can be added here

    next();
};
