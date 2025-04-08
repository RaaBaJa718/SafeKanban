import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        res.status(401).json({ message: 'Access Denied: No Token Provided' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Access Denied: Invalid Token' });
            return;
        }

        (req as any).user = user; // Attach the decoded user information to the request object
        next(); // Pass control to the next middleware or route handler
    });
}

export default authenticateToken;