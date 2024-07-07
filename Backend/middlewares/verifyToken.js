const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization'];

    // Check if token exists
    if (!token) {
        return res.status(403).json({ error: 'Access Denied' });
    }

    try {
        // Verify JWT token
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // If token is valid, attach decoded user information to request object
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        // Handle any other errors that might occur during verification
        console.error('Token verification error:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = verifyToken;