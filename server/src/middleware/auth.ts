import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware to authenticate JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid Token' });
        }

        // Attach user data to the request object
        (req as any).user = user; // Use type assertion if needed to avoid TypeScript errors
        next(); // Proceed to the next middleware or route handler
    });
};

export default authenticateToken;