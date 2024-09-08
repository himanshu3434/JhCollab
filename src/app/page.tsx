"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hold, setHold] = useState(false);
  const [input, setInput] = useState("");
  const handleHold = () => {
    setHold(true);

    socket.emit("hold", true);
  };
  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    socket.emit("codee", e.target.value);
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    socket.emit("input", e.target.value);
  };
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }
    socket.on("codee", (data) => {
      console.log("  recived data ", data);
      setCode(data);
    });
    socket.on("hold", (data) => {
      console.log(" Hold Status", data);
      setHold(data);
    });
    socket.on("output", (data) => {
      console.log(" OutPut", data);
      setOutput(data);
      setHold(false);
    });

    socket.on("input", (data) => {
      console.log(" input", data);
      setInput(data);
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("codee");
      socket.off("hold");
      socket.off("output");
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      <div className="flex space-x-3">
        <div className="flex justify-center">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="h-[50vh] w-[70vw] bg-gray-900 text-white"
            placeholder="Write  You Code here ....."
          />
        </div>
        <div>
          <h1>Input</h1>
          <textarea
            value={input}
            onChange={handleInputChange}
            className="h-[30vh] w-[30vw] bg-gray-700 text-white"
            placeholder="Enter Input in codeforces Format ....."
          />
          {output.length > 0 && (
            <textarea
              value={output}
              disabled
              className="h-[30vh] w-[30vw] bg-gray-700 text-white"
            />
          )}
          <div>
            <button
              className={`text-white p-3  rounded-lg  ${
                hold === true
                  ? "bg-gray-400 hover:bg-gray-500"
                  : "bg-green-600  hover:bg-green-500"
              }`}
              onClick={handleHold}
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
