import { prisma } from "../config/prisma";

export class AuthTokenRepository {
  static async createAuthToken(token: string) {
    return await prisma.authToken.create({
      data: { token },
      select: { token: true },
    });
  }

  static async getAuthToken(token: string) {
    return await prisma.authToken.findUnique({
      where: { token },
      select: { token: true },
    });
  }

  static async deleteAuthToken(token: string) {
    const exists = await prisma.authToken.findUnique({ where: { token } });
    if (!exists) throw new Error("Token not found");

    return await prisma.authToken.delete({
      where: { token },
      select: { token: true },
    });
  }
}
