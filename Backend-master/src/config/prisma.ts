import { PrismaClient } from "@prisma/client";

console.log("Prisma client created");
export const prisma = new PrismaClient();