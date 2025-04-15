import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;

  try {
    // Find user using Sequelize `where` clause
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid credentials.' });
    }

    // Ensure the JWT secret is available
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!jwtSecret) {
      console.error('JWT secret not found in environment variables.');
      return res.status(500).json({ message: 'Internal server error.' });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { username: user.username, id: user.id }, // Payload
      jwtSecret, // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Respond with the token
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;