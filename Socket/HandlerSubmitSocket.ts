import { PrismaClient } from "@prisma/client";
import { ioType, roomPrismaType, socketType, submitType } from "../types/types";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import Docker from "dockerode";
const client = new PrismaClient();
const docker = new Docker();
const generateOutput = async (
  codeSubmit: roomPrismaType,
  socket: socketType,
  io: ioType,
  roomId: string
) => {
  setTimeout(async () => {
    const updatedData = await client.room.update({
      where: { id: codeSubmit.id },
      data: { output: "output generated SuccessFully", status: "Completed" },
    });
    console.log("updatedData    ", updatedData);
    io.to(roomId).emit("output", "output generated SuccessFully");
  }, 3000);
};
export const HandlerSubmitSocket = (socket: socketType, io: ioType) => {
  socket.on("submit", async (code, input, roomId) => {
    // const codeSubmit = await client.room.create({
    //   data: {
    //     roomId: roomId,
    //     code: code,
    //     input: input,
    //     output: "",
    //   },
    // });

    // generateOutput(codeSubmit, socket, io, roomId);
    const extension = "cpp";
    io.to(roomId).emit("submit", true);
    const filePath = `${__dirname}/Code/`;
    const fileName = filePath + `code.${extension}`;
    const fileInputName = filePath + "input.txt";

    if (!existsSync(filePath)) {
      mkdirSync(filePath);
    }

    writeFileSync(fileName, code);
    writeFileSync(fileInputName, input);
    console.log("docker created");
    const container = await docker.createContainer({
      Image: `${extension}-image`,
      AttachStdin: true,
      AttachStdout: true,
      HostConfig: {
        Binds: [`${__dirname}/Code:/judge`],
      },
    });
    console.log("logs created");
    await container.start();
    const logs = await container.logs({
      follow: true,
      stderr: true,
      stdout: true,
    });

    let output = "";
    logs.on("data", (data) => {
      output += data.toString();
      console.log("output in log ", output);
    });

    logs.on("error", (err) => {
      console.error("Error reading logs ", err);
    });

    await container.wait();
    const timeout = setTimeout(async () => {
      await container.remove();
      output = "Time Limit Exceeded";
    }, 3000);

    await container.remove();
    clearTimeout(timeout);
    unlinkSync(fileName);
    unlinkSync(fileInputName);
    const binarypath = filePath + "code";
    if (existsSync(binarypath)) {
      unlinkSync(binarypath);
    }
    console.log("output", output);
    io.to(roomId).emit("output", output);
  });
};
