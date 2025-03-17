import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { adminDetailsValidation } from '../validations/admin.validation';

export class Admin {
    static async adminDetails(req: Request, res: Response) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw new Error('Authorization header not found');
            const token = authHeader.split(' ')[1];
            const admin = await AdminService.adminDetails(token);
            res.status(200).json({success: true, data: admin});
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.error(error);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: 'Internal server error'});
            }
        }
    }

    static async registerAdmin(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.email || !body.password || !body.secretKey) throw new Error('Missing required fields');
            const data = {
                email: body.email,
                password: body.password,
                secretKey: body.secretKey
            }
            const result = adminDetailsValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const admin = await AdminService.registerAdmin(data);
            res.status(200).json({success: true, data: admin});
        }
        catch (error: unknown) {
            if(error instanceof Error) {
                console.error(error);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: 'Internal server error'});
            }
        }
    }

    static async adminLogin(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.email || !body.password || !body.secretKey) throw new Error('Missing required fields');
            const data = {
                email: body.email,
                password: body.password,
                secretKey: body.secretKey
            }
            console.log(data);
            const result = adminDetailsValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const admin = await AdminService.adminLogin(data);
            if(!admin) throw new Error('Invalid credentials');
            res.status(200).json({success: true, data: admin});
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.error(error);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: 'Internal server error'});
            }
        }
    }

    // Commenting for now -- to be implemented as per the requirement

    // static async adminUpdate(req: Request, res: Response) {
    //     try {
    //         const admin = await AdminService.adminUpdate(req.body);
    //         if(!admin) throw new Error('Admin not found');
    //         res.status(200).json({success: true, data: admin});
    //     } catch (error: unknown) {
    //         if(error instanceof Error) {
    //             console.error(error);
    //             res.status(400).json({success: false, message: error.message});
    //         } else {
    //             res.status(400).json({success: false, message: 'Internal server error'});
    //         }
    //     }
    // }

    // static async deleteAdmin(req: Request, res: Response) {
    //     try {
    //         const admin = await AdminService.deleteAdmin(req.body);
    //         if(!admin) throw new Error('Admin not found');
    //         res.status(200).json({success: true, data: admin});
    //     } catch (error: unknown) {
    //         if(error instanceof Error) {
    //             console.error(error);
    //             res.status(400).json({success: false, message: error.message});
    //         } else {
    //             res.status(400).json({success: false, message: 'Internal server error'});
    //         }
    //     }
    // }

    // static async updatePermission(req: Request, res: Response) {
    //     try {
    //         const permissions = await AdminService.updatePermission(req.body);
    //         if(!permissions) throw new Error('Admin not found');
    //         res.status(200).json({success: true, data: "Updated permissions"});
    //     } catch (error: unknown) {
    //         if(error instanceof Error) {
    //             console.error(error);
    //             res.status(400).json({success: false, message: error.message});
    //         } else {
    //             res.status(400).json({success: false, message: 'Internal server error'});
    //         }
    //     }
    // }
}