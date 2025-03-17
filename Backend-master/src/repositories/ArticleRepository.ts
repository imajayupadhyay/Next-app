import { prisma } from "../config/prisma";
import { IArticle, IArticleUpdate, IDArticle, IPArticle } from "../interfaces/article.interface";

export class ArticleRepository {
  static async getArticles({ slug }: { slug: string }) {
    return await prisma.article.findMany({
      where: { parentSlug: slug },
      select: { title: true, tags: true, slug: true, updatedAt: true },
    });
  }

  static async getArticle({slug}: {slug: string}) {
    return await prisma.article.findUnique({
      where: {slug},
      select: {title: true, content: true, tags: true},
    });
  }

  static async getParentArticle({slug}: {slug: string}) {
    return await prisma.parentArticle.findUnique({
      where: {slug},
      select: {id: true, title: true, content: true},
    });
  }

  static async getDailyArticle({ where }: { where: any }) {
    return await prisma.dailyArticle.findMany({
      where,
      select: { id: true, title: true, content: true, date: true },
    });
  }

  static async newArticle({ title, content, tags, slug, parentSlug }: IArticle) {
    return await prisma.article.create({
      data: { title, content, tags, slug },
      select: { id: true },
    });
  }

  static async newParent({ title, content, slug }: IPArticle) {
    return await prisma.parentArticle.create({
      data: { title, content, slug },
      select: { id: true },
    });
  }

  static async newDailyArticle({ title, content, type, date }: {title: string, content: string, type: string, date: Date}) {
    return await prisma.dailyArticle.create({
      data: { title, content, type, date },
      select: { id: true },
    });
  }

  static async updateArticle({ id, title, content, tags, slug }: IArticleUpdate) {
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) throw new Error("Article not found");

    return await prisma.article.update({
      where: { id },
      data: { title, content, tags, slug },
      select: { id: true },
    });
  }

  static async updateParent({slug, parentSlug}: {slug: string, parentSlug: string}) {
    const exists = await prisma.article.findUnique({ where: { slug } });
    if (!exists) throw new Error("Article not found");
    const parent = await prisma.parentArticle.findUnique({ where: { slug: parentSlug } });
    if (!parent) throw new Error("Parent article not found");
    return await prisma.article.update({
      where: { slug },
      data: { parentSlug },
      select: { slug: true },
    });
  }

  static async updateParentArticle({id, slug, title, content}: IPArticle) {
    const exists = await prisma.parentArticle.findUnique({ where: { slug } });
    if (!exists) throw new Error("Parent article not found");
    return await prisma.parentArticle.update({
      where: { id },
      data: { slug, title, content },
      select: { id: true },
    });
  }

  static async updateDailyArticle({ id, title, content, type, date }: {id: string, title: string, content: string, type: string, date: Date}) {
    const exists = await prisma.dailyArticle.findUnique({ where: { id } });
    if (!exists) throw new Error("Article not found");
    return await prisma.dailyArticle.update({
      where: { id },
      data: { title, content, type, date },
      select: { id: true },
    });
  }

  static async deleteArticle({ id }: { id: string }) {
    const exists = await prisma.article.findUnique({ where: { id } });
    if (!exists) throw new Error("Article not found");

    return await prisma.article.delete({
      where: { id },
      select: { id: true },
    });
  }

  static async deleteParentArticle({ slug }: { slug: string }) {
    return await prisma.parentArticle.delete({
      where: { slug },
      select: { id: true },
    });
  }

  static async deleteDailyArticle({ id }: { id: string }) {
    return await prisma.dailyArticle.delete({
      where: { id },
      select: { id: true },
    });
  }
}
