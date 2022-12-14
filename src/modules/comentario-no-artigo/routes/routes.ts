import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const articleCommentRoute = Router();

articleCommentRoute.post("/api/v1/article/comment", async (req: Request, res: Response) => {
  const { text, articleId, authorId } = req.body;

  const newComment = await prismaClient.commentInArticle.create({
    data: {
      text: text,
      articleId: articleId,
      authorId: authorId,
    },
  });

  res.status(201).json(newComment);
});

articleCommentRoute.get("/api/v1/article/comment", async (req: Request, res: Response) => {
  const comments = await prismaClient.commentInArticle.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          isCreator: true,
        },
      },
      article: {
        select: {
          id: true,
          title: true,
          author: {
            select: {
              username: true,
              isCreator: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(comments);
});
