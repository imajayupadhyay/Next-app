import { prisma } from "../config/prisma";
import { IForm } from "../interfaces/form.interface";

export class FormRepository {
    static async formSubmit({ name, email, phone, message }: IForm) {
        return await prisma.formData.create({
            data: { name, email, phone, message },
            select: { id: true },
        });
    }
}
