import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

// Extend Express Request type to include userId
export interface CustomRequest extends Request {
    userId?: string; // Optional in case JWT is invalid
}

export const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
         res.status(401).json({ message: "No or invalid token provided" });
         return
    }

    const token = header.split(" ")[1]; // Extract token after "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
         res.status(403).json({ message: "Invalid or expired token" });
         return
    }
}