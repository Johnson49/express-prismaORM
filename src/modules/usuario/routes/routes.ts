import { Request, Response, Router } from "express";
import { prismaClient } from "@database/client-prisma";
import userController from "@usuario/controllers/user-controller";
export const userRoute = Router();

// userRoute.post("/api/v1/user", userController.create);
userRoute.post("/api/v1/user", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const userAlreadyExists = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      mensagem: "user already exists ",
    });
  }

  const newUser = await prismaClient.user.create({
    data: {
      email: email,
      password: password,
      username: username,
    },
  });

  res.status(201).json(newUser);
});

userRoute.get("/api/v1/user", async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany({
    include: {
      videos: {
        select: {
          id: true,
          title: true,
          url: true,
          describe: true,
        },
      },
      Article: {
        select: {
          id: true,
          title: true,
        },
      },
      podcast: {
        select: {
          id: true,
          title: true,
          url: true,
          describe: true,
        },
      },
      comment_in_article: {
        select: {
          id: true,
          articleId: true,
          text: true,
          article: {
            select: {
              title: true,
              author: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      },
      comment_in_podcast: {
        select: {
          id: true,
          text: true,
          podcastId: true,
          podcast: {
            select: {
              title: true,
              url: true,
              author: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      },
      comment_in_video: {
        select: {
          id: true,
          text: true,
          videoId: true,
          video: {
            select: {
              title: true,
              url: true,
              author: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      },
    },
  });

  res.status(200).json(users);
});
