import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { EnumType } from "typescript";

export type socketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export type ioType = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export type submitType = {
  roomId: string;
  code: string;
  input: string;
};

export type roomPrismaType = {
  id: number;
  roomId: string;
  code: string;
  input: string;
  output: string;
  status: string;
  error: string;
};

export type RoomUserMapType = {
  [key: string]: string;
};
