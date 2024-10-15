"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
type codeEditorType = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  roomId: string;
};
import { socket } from "../socket";
function CodeEditor({ code, setCode, roomId }: codeEditorType) {
  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    socket.emit("code", e.target.value, roomId);
  };

  useEffect(() => {
    socket.on("code", (data) => {
      console.log("  recived data ", data);
      setCode(data);
    });

    return () => {
      socket.off("code");
    };
  }, []);

  return (
    <div className="flex justify-center">
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="h-[50vh] w-[70vw] bg-gray-900 text-white"
        placeholder="Write  You Code here ....."
      />
    </div>
  );
}

export default CodeEditor;
