import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

import { HandlerCodeSocket } from "./Socket/HandlerCodeSocket";
import { HandlerSubmitSocket } from "./Socket/HandlerSubmitSocket";
import { HandlerInputSocket } from "./Socket/HandlerInputSocket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("socket is working successfully");
    console.log("all rooms ", io.sockets.adapter.rooms);
    HandlerCodeSocket(socket, io);
    HandlerInputSocket(socket, io);
    HandlerSubmitSocket(socket, io);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
