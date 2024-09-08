import { ioType, socketType } from "../types/types";

export const HandlerHoldSocket = (socket: socketType, io: ioType) => {
  socket.on("hold", async (data) => {
    socket.broadcast.emit("hold", data);
  });
};
