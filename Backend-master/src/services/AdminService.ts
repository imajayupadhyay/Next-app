import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminRepository } from "../repositories/AdminRepository";
import { IAdmin } from "../interfaces/admin.interface";
import { AuthTokenRepository } from "../repositories/AuthTokenRepository";

const secret = process.env.TOKEN_SECRET as string;

export class AdminService {
    static async adminDetails(token: string) {
        const decoded = jwt.verify(token, secret) as { id: string };
        const admin = await AdminRepository.getAdmin({ id: decoded.id });
        if (!admin) throw new Error('Admin not found');
        return admin;
    }

    static async registerAdmin({ email, password, secretKey }: IAdmin) {
        const hash = await bcrypt.hash(password, 10);
        const admin = await AdminRepository.createAdmin({ email, password: hash, secretKey });
        return admin;
    }

    static async adminLogin({ email, password, secretKey }: IAdmin) {
        const admin = await AdminRepository.getAdminByEmail({ email });
        if (!admin) throw new Error('Invalid email');

        if(email !== admin.email || secretKey !== admin.secretKey) throw new Error('Invalid credentials');
        const match = await bcrypt.compare(password, admin.password);
        if (!match) throw new Error('Invalid password');

        const token = jwt.sign({ id: admin.id }, secret) as string;
        await AuthTokenRepository.createAuthToken( token );
        return { token };
    }

    // To be implemented as per the requirement

    // static async adminUpdate({ id, password }: { id: string, password: string }) {
    //     const hash = await bcrypt.hash(password, 10);
    //     const admin = await AdminRepository.updateAdmin({ id, password: hash });
    //     if (!admin) throw new Error('Admin not found');
    //     return admin;
    // }

    // static async deleteAdmin({ id }: { id: string }) {
    //     const admin = await AdminRepository.deleteAdmin({ id });
    //     if (!admin) throw new Error('Admin not found');
    //     return admin;
    // }
}