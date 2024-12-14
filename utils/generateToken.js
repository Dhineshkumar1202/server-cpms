const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

exports.generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};
