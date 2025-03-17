import { z } from 'zod';

export const adminDetailsValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    secretKey: z.string().min(6),
});
