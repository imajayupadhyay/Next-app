import { z } from 'zod';

export const articleValidation = z.object({
    title: z.string().min(2, { message: "Title must be atleast 2 characters" }),
    content: z.string().min(10, { message: "Content must be atleast 10 characters" }),
    tags: z.array(z.string()).min(1, { message: "Atleast one tag is required" }),
    slug: z.string().min(1, { message: "Slug must be atleast 1 characters" }),
    parentSlug: z.string()
})

export const parentArticleValidation = z.object({
    title: z.string().min(2, { message: "Title must be atleast 2 characters" }),
    content: z.string().min(10, { message: "Content must be atleast 10 characters" }),
    slug: z.string().min(1, { message: "Slug must be atleast 1 characters" }),
})

export const dailyArticleValidation = z.object({
    title: z.string().min(2, { message: "Title must be atleast 2 characters" }),
    content: z.string().min(10, { message: "Content must be atleast 10 characters" }),
    type: z.string().min(1, { message: "Type must be atleast 1 characters" }),
    date: z.string().min(1, { message: "Date is required" }),
})