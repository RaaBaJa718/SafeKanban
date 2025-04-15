import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return; // Explicitly return after sending a response
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden: Invalid token' });
      return; // Explicitly return after sending a response
    }

    if (!user) {
      res.status(403).json({ message: 'Forbidden: No user data in token' });
      return; // Handle the case where `user` is null or undefined
    }

    req.user = user as JwtPayload;
    next(); // Proceed to the next middleware
  });
};



import express from 'express';
// Ensure the correct path to the user-routes module
import { userRouter } from '../routes/api/user-routes';
// Ensure the correct path to the auth-routes module
import authRoutes from '../routes/auth-routes';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
