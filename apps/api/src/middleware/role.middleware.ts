import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Gantilah dengan kunci rahasia yang sebenarnya

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, secretKey) as { userId: number; username: string; role: string };

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      (req as any).user = decoded; 
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
};
