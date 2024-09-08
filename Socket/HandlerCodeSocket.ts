import { ioType, socketType } from "../types/types";

export const HandlerCodeSocket = (socket: socketType, io: ioType) => {
  socket.on("codee", (code) => {
    console.log("codee", code);

    io.emit("codee", code);
  });
};
