import { ArticleRepository } from "../repositories/ArticleRepository";
import { IArticle, IArticleUpdate, IDArticle, IPArticle } from "../interfaces/article.interface";

const secret = process.env.TOKEN_SECRET as string;

export class ArticleService {
    static async getArticles({ slug }: { slug: string }) {
        const article = await ArticleRepository.getArticles({ slug });
        return article;
    }

    static async getArticle({slug}: {slug: string}) {
        const article = await ArticleRepository.getArticle({slug});
        return article;
    }

    static async getParentArticle({slug}: {slug: string}) {
        const article = await ArticleRepository.getParentArticle({slug});
        return article;
    }

    static async getDailyArticle({ date, type } : { date: string, type: string }) {
        console.log(date, type);
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0);
        if (isNaN(formattedDate.getTime())) throw new Error("Invalid date format");

        let whereCondition: any = {};
        if (type === "daily") {
        whereCondition = {
            date: {
            gte: new Date(`${date}T00:00:00.000Z`),
            lt: new Date(`${date}T23:59:59.999Z`),
            },
            type
        };
        } else if (type === "monthly") {
        const year = formattedDate.getFullYear();
        const month = formattedDate.getMonth();
        whereCondition = {
            date: {
            gte: new Date(year, month, 1),
            lt: new Date(year, month + 1, 1),
            },
            type
        };
        } else if (type === "yearly") {
        const year = formattedDate.getFullYear();
        whereCondition = {
            date: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1),
            },
            type
        };
        } else {
        throw new Error("Invalid type: Use 'daily', 'monthly', or 'yearly'");
        }

        const articles = await ArticleRepository.getDailyArticle({ where: whereCondition });
        return articles;

    }

    static async newArticle({ title, content, tags, slug, parentSlug }: IArticle) {
        if(!parentSlug) throw new Error('Parent ID is required');
        const article = await ArticleRepository.newArticle({ title, content, tags, slug, parentSlug });
        return article;
    }

    static async newParentArticle({ title, content, slug }: IPArticle) {
        const article = await ArticleRepository.newParent({ title, content, slug });
        return article;
    }

    static async newDailyArticle({ title, content, type, date }: IDArticle) {
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0);
        if (isNaN(formattedDate.getTime())) throw new Error("Invalid date format");
        const article = await ArticleRepository.newDailyArticle({ title, content, type, date: formattedDate });
        return article;
    }

    static async updateArticle({ id, title, content, tags, slug }: IArticleUpdate) {
        const article = await ArticleRepository.updateArticle({ id, title, content, tags, slug });
        return article;
    }

    static async updateParent({slug, parentSlug}: {slug: string, parentSlug: string}) {
        const exists = await ArticleRepository.getArticle({ slug });
        if(!exists) throw new Error('Article not found');
        const article = await ArticleRepository.updateParent({slug, parentSlug});
        return article;
    }

    static async updateParentArticle({id, slug, title, content}: IPArticle) {
        if(!id) throw new Error('Parent ID is required');
        const exists = await ArticleRepository.getParentArticle({ slug });
        if(!exists) throw new Error('Parent article not found');
        const article = await ArticleRepository.updateParentArticle({id, slug, title, content});
        return article;
    }

    static async updateDailyArticle({ id, title, content, type, date }: IDArticle) {
        if(!id) throw new Error('Article ID is required');
        const formattedDate = new Date(date);
        formattedDate.setUTCHours(0, 0, 0, 0);
        if (isNaN(formattedDate.getTime())) throw new Error("Invalid date format");
        const article = await ArticleRepository.updateDailyArticle({ id, title, content, type, date: formattedDate });
        return article;
    }

    static async deleteArticle({ id }: { id: string }) {
        const article = await ArticleRepository.deleteArticle({ id });
        return article;
    }

    static async deleteParentArticle({ slug }: { slug: string }) {
        const exists = await ArticleRepository.getParentArticle({ slug });
        if(!exists) throw new Error('Parent article not found');
        const article = await ArticleRepository.deleteParentArticle({ slug });
        return article;
    }

    static async deleteDailyArticle({ id }: { id: string }) {
        // const exists = await ArticleRepository.getArticleById({ id });
        // if(!exists) throw new Error('Article not found');
        const article = await ArticleRepository.deleteDailyArticle({ id });
        return article;
    }
}