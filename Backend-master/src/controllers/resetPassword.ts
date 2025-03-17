import { Request, Response } from 'express';
import { ResetPasswordService } from '../services/resetPassword';

export class ResetPassword {
    static async resetPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
            if(!email) throw new Error('Email is required');
            const response = await ResetPasswordService.resetPassword(email);
            res.status(200).json({success: true, message: response});
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async resetPasswordToken(req: Request, res: Response) {
        const { token } = req.params;
        try {
            if(!token) throw new Error('Token is required');
            const response = await ResetPasswordService.resetPasswordToken(token);
            res.status(200).json({success: true, message: response});
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

}