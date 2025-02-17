import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

// Extend Express Request type to include userId
export interface CustomRequest extends Request {
    userId?: string; // Optional in case JWT is invalid
}

export const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET as string)

    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })

            return;
        }

        req.userId = (decoded as JwtPayload).id;
        next()
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
}