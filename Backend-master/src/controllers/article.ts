import { Request, Response } from 'express';
import { ArticleService } from '../services/ArticleService';
import { articleValidation, dailyArticleValidation, parentArticleValidation } from '../validations/article.validation';

export class Article {
    // GET requests :-

    static async getArticles(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            if(!slug) throw new Error('Article ID is required');
            const article = await ArticleService.getArticles({slug});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async getArticleBySlug(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            if(!slug) throw new Error('Article slug is required');
            const article = await ArticleService.getArticle({slug});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async getParentArticle(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            if(!slug) throw new Error('Article slug is required');
            const article = await ArticleService.getParentArticle({slug});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async getDailyArticle(req: Request, res: Response) {
        try {
            const { date, type } = req.params;
            if(!date || !type) throw new Error('Date and type are required');
            if(type !== 'daily' && type !== 'monthly' && type !== 'yearly') throw new Error('Invalid type');
            const article = await ArticleService.getDailyArticle({date: date as string, type: type as string});
            if(!article) throw new Error('Article not found');
            console.log(article);
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    // POST requests:-

    static async newArticle(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.title || !body.content || !body.tags) throw new Error('Article data is required');
            const slug = body.title.toLowerCase().replace(/ /g, '-');
            const data = {
                title: body.title,
                content: body.content,
                tags: body.tags,
                slug,
                parentSlug: '-'
            }
            console.log(data);
            const result = articleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = await ArticleService.newArticle(data);
            res.status(201).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async newParentArticle(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.title || !body.content ) throw new Error('Article data is required');
            const slug = body.title.toLowerCase().replace(/ /g, '-');
            const data = {
                title: body.title,
                content: body.content,
                slug
            }
            console.log(data);
            const result = parentArticleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = await ArticleService.newParentArticle(data);
            res.status(201).json({ success: true, data: article });
        }
        catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async newDailyArticle(req: Request, res: Response) {
        try {
            const body = req.body;
            if(!body.title || !body.content || !body.date || !body.type) throw new Error('Article data is required');
            const data = {
                title: body.title,
                content: body.content,
                date: body.date,
                type: body.type
            }
            if(data.type !== 'daily' && data.type !== 'monthly' && data.type !== 'yearly') throw new Error('Invalid type');
            const result = dailyArticleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = await ArticleService.newDailyArticle(data);
            res.status(201).json({ success: true, data: article });
        }
        catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }


    // PUT requests:-

    static async updateArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(!id) throw new Error('Article ID is required');
            const body = req.body;
            if(!body.title || !body.content || !body.tags) throw new Error('Article data is required');
            const slug = body.title.toLowerCase().replace(/ /g, '-');
            const data = {
                title: body.title,
                content: body.content,
                tags: body.tags,
                slug,
                parentId: '-'
            }
            const result = articleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = await ArticleService.updateArticle({...data, id});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async updateParentArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(!id) throw new Error('Parent ID is required');
            const body = req.body;
            if(!body.title || !body.content ) throw new Error('Article data is required');
            const slug = body.title.toLowerCase().replace(/ /g, '-');
            const data = {
                id,
                title: body.title,
                content: body.content,
                slug
            }
            const result = parentArticleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = await ArticleService.updateParentArticle(data);
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        }
        catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async updateParent(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            if(!slug) throw new Error('Article slug is required');
            const parentSlug = req.body.parentSlug;
            if(!parentSlug) throw new Error('Parent ID is required');
            const article = await ArticleService.updateParent({slug, parentSlug});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static updateDailyArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(!id) throw new Error('Article ID is required');
            const body = req.body;
            if(!body.title || !body.content || !body.date || !body.type) throw new Error('Article data is required');
            const data = {
                title: body.title,
                content: body.content,
                date: body.date,
                type: body.type
            }
            const result = dailyArticleValidation.safeParse(data);
            if(!result.success) throw new Error(result.error.message);
            const article = ArticleService.updateDailyArticle({...data, id});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        }
        catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    // DELETE requests:-

    static async deleteArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(!id) throw new Error('Article ID is required');
            const article = await ArticleService.deleteArticle({id});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async deleteParentArticle(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            if(!slug) throw new Error('Article slug is required');
            const article = await ArticleService.deleteParentArticle({slug});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async deleteDailyArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(!id) throw new Error('Article ID is required');
            const article = await ArticleService.deleteDailyArticle({id});
            if(!article) throw new Error('Article not found');
            res.status(200).json({ success: true, data: article });
        } catch (error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}