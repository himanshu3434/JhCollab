import { ioType, socketType } from "../types/types";

export const HandlerCodeSocket = (socket: socketType, io: ioType) => {
  socket.on("code", (code, roomId) => {
    console.log("code", code);
    console.log("room id ", roomId);
    io.to(roomId).emit("code", code);
  });
};
