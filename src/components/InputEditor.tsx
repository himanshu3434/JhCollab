"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
type inputEditorType = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  roomId: string;
};
import { socket } from "../socket";
function InputEditor({ input, setInput, roomId }: inputEditorType) {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    socket.emit("input", e.target.value, roomId);
  };

  useEffect(() => {
    socket.on("input", (data) => {
      console.log(" input", data);
      setInput(data);
    });

    return () => {
      socket.off("input");
    };
  }, []);

  return (
    <div>
      <h1>Input</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        className="h-[30vh] w-[30vw] bg-gray-700 text-white"
        placeholder="Enter Input in codeforces Format ....."
      />
    </div>
  );
}

export default InputEditor;
