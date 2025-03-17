import { Request, Response } from "express";
import { PracticeService } from "../services/practice";

export class Practice {
    static async getPractice(req: Request, res: Response){
        try {
            const practice = await PracticeService.getPractice(req.params.id);
            if(!practice) throw new Error("Practice not found");
            res.status(200).json({success: true, data: practice});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in getPractice"});
            }
        }
    }

    static async newPractice(req: Request, res: Response){
        try {
            const practice = await PracticeService.newPractice(req.body);
            if(!practice) throw new Error("Practice cannot be created");
            res.status(200).json({success: true, data: practice});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in newPractice"});
            }
        }
    }

    static async updatePractice(req: Request, res: Response){
        try {
            const practice = await PracticeService.updatePractice(req.params.id, req.body);
            if(!practice) throw new Error("Practice cannot be updated");
            res.status(200).json({success: true, data: practice});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in updatePractice"});
            }
        }
    }

    static async deletePractice(req: Request, res: Response){
        try {
            const practice = await PracticeService.deletePractice(req.params.id);
            if(!practice) throw new Error("Practice cannot be deleted");
            res.status(200).json({success: true, data: practice});
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({success: false, message: error.message});
            } else {
                res.status(400).json({success: false, message: "Something went wrong in deletePractice"});
            }
        }
    }
}