export interface IArticle {
    id?: string;
    title: string;
    content: string;
    tags: string[];
    slug: string;
    parentSlug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IArticleUpdate {
    id: string;
    title: string;
    content: string;
    tags: string[];
    slug: string;
}

export interface IPArticle {
    id?: string;
    title: string;
    content: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDArticle {
    id?: string;
    title: string;
    content: string;
    type: string;
    date: string;
    createdAt?: Date;
    updatedAt?: Date;
}