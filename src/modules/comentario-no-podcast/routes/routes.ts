import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const podcastCommentRoute = Router();

podcastCommentRoute.post("/api/v1/podcast/comment", async (req: Request, res: Response) => {
  const { text, podcastId, authorId } = req.body;

  const newComment = await prismaClient.commentInPodcast.create({
    data: {
      text: text,
      podcastId: podcastId,
      authorId: authorId,
    },
  });

  res.status(201).json(newComment);
});

podcastCommentRoute.get("/api/v1/podcast/comment", async (req: Request, res: Response) => {
  const comments = await prismaClient.commentInPodcast.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          isCreator: true,
        },
      },
      podcast: {
        select: {
          id: true,
          title: true,
          url: true,
          describe: true,
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
