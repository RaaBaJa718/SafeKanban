import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided.' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        if (decoded) {
            const { username } = decoded; // Typecast the payload
            req.user = { username }; // Attach user data to the request object
            return next(); // Explicitly call `next()` in the success case
        }
        return res.status(500).json({ message: 'Unexpected error decoding token.' }); // Fallback return
    });
};
