import { prisma } from "../config/prisma";

export class PasswordTokenRepository {
  static async createResetToken(token: string, userId: string) {
    return await prisma.resetPassToken.create({
      data: { token, userId },
      select: { token: true },
    });
  }

  static async getAuthToken(token: string) {
    return await prisma.resetPassToken.findUnique({
      where: { token },
      select: { token: true, userId: true, createdAt: true },
    });
  }

  static async deleteAuthToken(token: string) {
    const exists = await prisma.resetPassToken.findUnique({ where: { token } });
    if (!exists) throw new Error("Token not found");

    return await prisma.resetPassToken.delete({
      where: { token },
      select: { token: true }
    });
  }
}
