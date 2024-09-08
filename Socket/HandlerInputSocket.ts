import { ioType, socketType } from "../types/types";

export const HandlerInputSocket = (socket: socketType, io: ioType) => {
  socket.on("input", (data) => {
    console.log("input Data", data);
    socket.broadcast.emit("input", data);
  });
};
