import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

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
