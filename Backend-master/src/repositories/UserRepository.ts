import { IUser } from "../interfaces/user.interface";
import { prisma } from "../config/prisma";

export class UserRepository {
    static async createUser({ firstName, lastName, email, phone, password }: IUser) {
        return await prisma.user.create({
            data: { firstName, lastName, email, phone, password },
            select: { id: true }
        });
    }

    static async getUser(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: { id: true, firstName: true, lastName: true, email: true, phone: true }
        });
    }

    static async getUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
            select: { id: true, password: true }
        });
    }

    static async updateUser(id: string, password: string) {
        return await prisma.user.update({
            where: { id },
            data: { password },
            select: { id: true }
        });
    }

    static async deleteUser(id: string) {
        const exists = await prisma.user.findUnique({ where: { id }, select: { id: true } });
        if (!exists) throw new Error("User not found");

        return await prisma.user.delete({
            where: { id },
            select: { id: true }
        });
    }
}
