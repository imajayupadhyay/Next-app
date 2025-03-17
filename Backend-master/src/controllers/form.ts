import { Request, Response } from 'express';
import { FormService } from '../services/FormService'

export class Form {
    static async formSubmit(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.name || !body.email || !body.number || !body.message) throw new Error("Please provide all the fields");
            const form = await FormService.formSubmit(body);
            if(!form) throw new Error("Something went wrong in form submission");
            res.status(200).json({success: true, message: "Form submitted successfully", data: form });
        } catch(error) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(500).json({success: false, message: error.message });
            } else {
                res.status(500).json({success: false, message: "Something went wrong!" });
            }
        }
    }

}