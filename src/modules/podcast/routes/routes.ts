import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";

export const podcastRoute = Router();

podcastRoute.post("/api/v1/podcast", async (req: Request, res: Response) => {
  const { title, url, describe, authorId } = req.body;

  const newPodcast = await prismaClient.podcast.create({
    data: {
      title: title,
      url: url,
      describe: describe,
      authorId: authorId,
    },
  });

  res.status(201).json(newPodcast);
});

podcastRoute.get("/api/v1/podcast", async (req: Request, res: Response) => {
  const newPodcasts = await prismaClient.podcast.findMany({
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

  res.status(200).json(newPodcasts);
});
