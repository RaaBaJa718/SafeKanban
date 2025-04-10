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