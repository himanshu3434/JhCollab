import { PrismaClient } from "@prisma/client";
import { ioType, roomPrismaType, socketType, submitType } from "../types/types";
const client = new PrismaClient();
const generateOutput = async (
  codeSubmit: roomPrismaType,
  socket: socketType,
  io: ioType
) => {
  setTimeout(async () => {
    const updatedData = await client.room.update({
      where: { id: codeSubmit.id },
      data: { output: "output generated SuccessFully", status: "Completed" },
    });
    console.log("updatedData    ", updatedData);
    io.emit("output", "output generated SuccessFully");
  }, 3000);
};
export const HandlerSubmitSocket = (socket: socketType, io: ioType) => {
  socket.on("submit", async (data: submitType) => {
    const codeSubmit = await client.room.create({
      data: {
        roomId: data.roomId,
        code: data.code,
        input: data.input,
        output: "",
      },
    });

    generateOutput(codeSubmit, socket, io);
    socket.broadcast.emit("submit", true);
  });
};
