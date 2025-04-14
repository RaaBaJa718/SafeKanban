import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authRoutes = Router();

authRoutes.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Log incoming username
    console.log('Login Attempt with Username:', username);

    // Check if user exists
    const user = await User.findOne({ where: { username } });
    console.log('Queried User:', user); // Debug log for user query

    if (!user) {
      console.error('User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Entered Password:', password);
    console.log('Stored Password Hash:', user.password);
    console.log('Password Match:', isPasswordValid); // Debug log for password comparison

    if (!isPasswordValid) {
      console.error('Invalid password');
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    console.log('Generated Token:', token); // Debug log for token generation

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Log unexpected errors
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default authRoutes;