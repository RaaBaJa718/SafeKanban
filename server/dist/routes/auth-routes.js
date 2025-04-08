import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
export const authRoutes = Router();
// Define routes here
authRoutes.get('/example', (_, res) => {
    res.send('Example route');
});
export const login = async (req, res) => {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    try {
        // Find the user in the database
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Generate a JWT
        const token = jwt.sign({ id: user.id, username: user.username }, // Payload
        process.env.JWT_SECRET_KEY, // Secret Key
        { expiresIn: '1h' } // Expiry Time
        );
        // Send the token to the client
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
    return; // Ensure all code paths return a value
};
