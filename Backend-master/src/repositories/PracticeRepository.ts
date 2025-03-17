import { prisma } from "../config/prisma";
import { IPractice } from "../interfaces/practice.interface";

export class PracticeRepository {
    static async getPractice(type: string, tag?: string, skip: Number = 0, take: Number = 5) {
        return await prisma.practice.findMany({
            where: { type, tag: tag || "" },
            select: { id: true, questions: true, options: true, level: true, tag: true, answer: true },
            skip: +skip,
            take: +take,
        });
    }

    static async newPractice({ questions, options, level, tag, answer, type }: IPractice) {
        return await prisma.practice.create({
            data: { questions, options, level, tag, answer, type },
            select: { id: true },
        });
    }

    static async updatePractice(id: string, { questions, options, level, tag, answer, type }: IPractice) {
        return await prisma.practice.update({
            where: { id },
            data: { questions, options, level, tag, answer, type },
            select: { id: true },
        });
    }

    static async deletePractice(id: string) {
        const exists = await prisma.practice.findUnique({ where: { id } });
        if (!exists) throw new Error("Practice not found");

        return await prisma.practice.delete({
            where: { id },
            select: { id: true },
        });
    }
}
