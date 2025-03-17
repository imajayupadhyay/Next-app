import { prisma } from '../config/prisma';
import { IAdmin } from '../interfaces/admin.interface';

export class AdminRepository {
    static async createAdmin({ email, password, secretKey }: IAdmin) {
        return await  prisma.admin.create({
            data: { email, password, secretKey },
            select: { id: true }
        });
    }

    static async getAdmin({ id }: { id: string }) {
        return await prisma.admin.findUnique({
            where: { id },
            select: { id: true, email: true, password: true, secretKey: true }
        });
    }

    static async getAdminByEmail({ email }: { email: string }) {
        return await prisma.admin.findUnique({
            where: { email },
            select: { id: true, email: true, password: true, secretKey: true }
        });
    }

    // To be implemented as per the requirement

    // static async updateAdmin({ id, password }: { id: string, password: string }) {
    //     return await  prisma.admin.update({
    //         where: { id },
    //         data: { password },
    //         select: { id: true }
    //     });
    // }

    // static async deleteAdmin({ id }: { id: string }) {
    //     const exist = await prisma.admin.findUnique({ where: { id } });
    //     if (!exist) throw new Error('Admin not found');

    //     return await prisma.admin.delete({
    //         where: { id },
    //         select: { id: true }
    //     });
    // }
}
