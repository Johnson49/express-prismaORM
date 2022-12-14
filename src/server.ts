import "module-alias/register";
import express from "express";
import { userRoute } from "@usuario/routes/routes";
import { videoRoute } from "@video/routes/routes";
import { articleRoute } from "@artigo/routes/routes";

import { articleCommentRoute } from "@comentario-no-artigo/routes/routes";
import { videoCommentRoute } from "@comentario-no-video/routes/routes";
import { podcastCommentRoute } from "@comentario-no-podcast/routes/routes";
import { podcastRoute } from "@podcast/routes/routes";

const server = express();

server.use(express.json());

server.use(userRoute);
server.use(videoRoute);
server.use(articleRoute);
server.use(podcastRoute);

server.use(articleCommentRoute);
server.use(videoCommentRoute);
server.use(podcastCommentRoute);

server.listen(3000, () => {
  console.log("server running on port 3000");
});
