"use client";

import React from "react";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import CodeEditor from "@/components/CodeEditor";
import InputEditor from "@/components/InputEditor";
import OutputBox from "@/components/OutputBox";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { toastSuccess } from "../../../../utils/toast";

function page({ params: { slugRoom } }: { params: { slugRoom: string[] } }) {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const route = useRouter();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hold, setHold] = useState(false);
  const [input, setInput] = useState("");
  const handleSubmit = () => {
    setHold(true);

    socket.emit("submit", code, input, slugRoom[0]);
  };

  useEffect(() => {
    if (socket.connected) {
      console.log(" in if ");
      console.log("socket.connected", socket.connected);
      console.log("socket", socket);
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      console.log("in on connect ");
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      socket.emit("join", slugRoom[0], slugRoom[1]);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
      route.push("/");
    }

    socket.on("submit", (data) => {
      console.log(" Hold Status", data);
      setHold(data);
    });
    socket.on("output", (data) => {
      console.log(" OutPut", data);
      setOutput(data);
      setHold(false);
    });
    socket.on("error", (data) => {
      console.log(" Error", data);
      redirect("/");
    });
    socket.on("user-joined", (data) => {
      console.log(" User Joined", data);
      toastSuccess(`${data} joined the room`);
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      socket.off("submit");
      socket.off("output");
      socket.off("error");
      socket.off("user-joined");
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <div>
        <div>
          <h1>Room Id : {slugRoom[0]}</h1>
          <button
            onClick={() => navigator.clipboard.writeText(slugRoom[0])}
            className="w-32 py-3 bg-green-400 rounded-lg hover:bg-green-500 "
          >
            Copy
          </button>
        </div>
        <h1>User Name : {slugRoom[1]}</h1>
      </div>
      <div className="flex space-x-3">
        <CodeEditor code={code} setCode={setCode} roomId={slugRoom[0]} />
        <div>
          <InputEditor input={input} setInput={setInput} roomId={slugRoom[0]} />
          <OutputBox output={output} />
          <div>
            <button
              className={`text-white p-3  rounded-lg  ${
                hold === true
                  ? "bg-gray-400 hover:bg-gray-500"
                  : "bg-green-600  hover:bg-green-500"
              }`}
              onClick={handleSubmit}
              disabled={hold}
            >
              {" "}
              {hold === true ? "Running...." : "Run"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
