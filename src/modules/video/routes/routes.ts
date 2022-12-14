import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const videoRoute = Router();

videoRoute.post("/api/v1/video", async (req: Request, res: Response) => {
  const { authorId, title, url, describe } = req.body;

  const newVideo = await prismaClient.video.create({
    data: {
      title: title,
      url: url,
      describe: describe,
      authorId: authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          isCreator: true,
        },
      },
    },
  });

  res.status(201).json(newVideo);
});

videoRoute.get("/api/v1/video", async (req: Request, res: Response) => {
  const videos = await prismaClient.video.findMany({
    include: {
      comments: {
        select: {
          text: true,
          author: {
            select: {
              username: true,
              isCreator: true,
              id: true,
            },
          },
        },
      },
      author: {
        select: {
          isCreator: true,
          username: true,
        },
      },
    },
  });

  res.status(200).json(videos);
});
