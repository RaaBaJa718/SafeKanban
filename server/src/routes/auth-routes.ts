import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;

  try {
    // Use Sequelize `where` clause to find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '1h' // Adjust token expiration time as needed
    });

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