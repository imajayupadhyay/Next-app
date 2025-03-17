import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserService } from "../services/UserService";

import { userDetailsValidation, userLoginValidation, userUpdateValidation } from "../validations/user.validation";

export class User{
    static async userDetails(req: Request, res: Response){
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader) throw new Error("Token not found");
            const token = authHeader.split(" ")[1];
            if(!token) throw new Error("Token not found");
            const { id } = jwt.verify(token, process.env.TOKEN_SECRET || '') as {id: string};
            const user = await UserService.getUserDetails(id);
            if(!user) throw new Error("User not found");
            res.status(200).json({success: true, data: user});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in userDetails"});
            }
        }
    }

    static async register(req: Request, res: Response){
        try {
            const body = req.body;
            if(!body.firstName || !body.lastName || !body.email || !body.phone || !body.password) throw new Error("Invalid body on register");
            const data = {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                password: body.password
            }
            const success = userDetailsValidation.safeParse(data);
            if(!success.success) throw new Error("Parsing failed");
            const user = await UserService.registerUser(data);
            if(!user) throw new Error("User cannot be registered");
            res.status(200).json({success: true, data: user});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in register"});
            }
        }
    }

    static async login(req: Request, res: Response){
        try {
            const body = req.body;
            if(!body.email || !body.password) throw new Error("Invalid body on login");
            const data = {
                email: body.email,
                password: body.password
            }
            const { success } = userLoginValidation.safeParse(data);
            if(!success) throw new Error("Invalid email or password to login");
            const user = await UserService.loginUser(data);
            if(!user) throw new Error("User cannot be logged in");
            res.status(200).json({success: true, data: user});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in login"});
            }
        }
    }

    static async userUpdate(req: Request, res: Response){
        try {
            const body = req.body;
            if(!body.password || !body.authUser) throw new Error("Invalid body on userUpdate");
            const data = {
                id: body.authUser || body.authUser.id,
                password: body.password
            }
            console.log(data);
            const { success } = userUpdateValidation.safeParse(data);
            if(!success) throw new Error("Invalid password to update");
            const user = await UserService.updateUser(data);    
            if(!user) throw new Error("User cannot be updated");
            res.status(200).json({success: true, data: user});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in userUpdate"});
            }
        }
    }

    static async deleteUser(req: Request, res: Response){
        try {
            const body = req.body;
            if(!body.authUser) throw new Error("Invalid body on deleteUser");
            const data = {
                id: body.authUser || body.authUser.id
            }
            const user = await UserService.deleteUser(data);
            if(!user) throw new Error("User cannot be deleted");
            res.status(200).json({success: true, data: user});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in deleteUser"});
            }
        }
    }

}