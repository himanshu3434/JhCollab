import { ioType, socketType } from "../types/types";

export const HandlerInputSocket = (socket: socketType, io: ioType) => {
  socket.on("input", (data, roomId) => {
    console.log("input Data", data);
    io.to(roomId).emit("input", data);
  });
};
