import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

import { HandlerCodeSocket } from "./Socket/HandlerCodeSocket";
import { HandlerSubmitSocket } from "./Socket/HandlerSubmitSocket";
import { HandlerInputSocket } from "./Socket/HandlerInputSocket";
import { RoomUserMapType } from "./types/types";
import { exec } from "node:child_process";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev });
const handler = app.getRequestHandler();

const initialSetupDocker = async () => {
  exec("docker build -t cpp-image Docker/Cpp", (error, stdout, stderr) => {
    if (error) {
      console.error(" exec error ", error);
      return;
    }
    console.log("stdout: ", stdout);
  });
  console.log("cpp image created successfully");
};

app.prepare().then(() => {
  const httpServer = createServer(handler);
  console.log("http Server");
  const io = new Server(httpServer);
  initialSetupDocker();
  const roomUserMap: RoomUserMapType = {};
  io.on("connection", (socket) => {
    console.log("socket is working successfully");
    console.log("all rooms ", io.sockets.adapter.rooms);
    socket.on("join", (roomId, userName) => {
      if (roomUserMap[socket.id]) return;
      socket.join(roomId);
      roomUserMap[socket.id] = userName;
      console.log(" in joing room ", roomUserMap);
      socket.to(roomId).emit("user-joined", userName);
    });
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
