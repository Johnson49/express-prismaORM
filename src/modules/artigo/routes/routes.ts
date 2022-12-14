import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const articleRoute = Router();

articleRoute.post("/api/v1/article", async (req: Request, res: Response) => {
  const { title, text, authorId } = req.body;

  const newArticle = await prismaClient.article.create({
    data: {
      title: title,
      text: text,
      authorId: authorId,
    },
  });

  res.status(201).json(newArticle);
});

articleRoute.get("/api/v1/article", async (req: Request, res: Response) => {
  const articles = await prismaClient.article.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          isCreator: true,
        },
      },
      comments: {
        select: {
          text: true,
          author: {
            select: {
              id: true,
              username: true,
              isCreator: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(articles);
});
