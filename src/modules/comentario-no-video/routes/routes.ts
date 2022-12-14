import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const videoCommentRoute = Router();

videoCommentRoute.post("/api/v1/video/comment", async (req: Request, res: Response) => {
  const { text, videoId, authorId } = req.body;

  const newComment = await prismaClient.commentInVideo.create({
    data: {
      text: text,
      videoId: videoId,
      authorId: authorId,
    },
    include: {
      video: {
        select: {
          id: true,
          title: true,
          url: true,
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

  res.status(201).json(newComment);
});

videoCommentRoute.get("/api/v1/video/comment", async (req: Request, res: Response) => {
  const comments = await prismaClient.commentInVideo.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          isCreator: true,
          email: true,
        },
      },
      video: {
        select: {
          id: true,
          title: true,
          url: true,
        },
      },
    },
  });

  res.status(200).json(comments);
});
