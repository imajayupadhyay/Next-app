import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthTokenRepository } from '../repositories/AuthTokenRepository';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET || '';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.headers.authorization;
        if (!cookie) throw new Error('No Cookie Denied');
        const token = cookie.split(' ')[1];
        if(!token) throw new Error('No token Denied');
        const tokenRepo = await AuthTokenRepository.getAuthToken(token);
        if (!tokenRepo) throw new Error('Invalid Token');
        const { id } = jwt.verify(token, secret) as { id: string };
        if(!id) throw new Error('Cannot verify token');
        req.body.authUser = id;
        next();
    }
    catch (err: unknown) { 
        if(err instanceof Error) {
            console.log(err.message);
            res.status(401).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Error checking token'
            });
        }
    }
}