"use client";

import React, { useState } from "react";
import { getRandomRoomId } from "../../utils/getRandomRoomId";
import { useRouter } from "next/navigation";

function ChoiceRoom() {
  const router = useRouter();
  const [joinRoom, setJoinRoom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [heading, setHeading] = useState("Select Options");
  const handleCreateRoom = () => {
    const newRoomId = getRandomRoomId();
    setRoomId(newRoomId);

    console.log("room - id ", newRoomId);
    router.push(`/room/${newRoomId}/${userName}`);
  };

  const handleJoinRoom = () => {
    router.push(`/room/${roomId}/${userName}`);
  };
  return (
    <div className=" ">
      <h1 className="mb-4 font-bold text-center text-xl  lg:text-3xl w-full">
        {heading}
      </h1>
      <div className="flex justify-center items-center  space-x-3 ">
        {!joinRoom && !createRoom && (
          <div>
            <button
              className="w-32 py-3 bg-red-400 rounded-lg hover:bg-red-500"
              onClick={() => setCreateRoom(true)}
            >
              Create Room
            </button>
          </div>
        )}
        {!joinRoom && !createRoom && (
          <div>
            <button
              className="w-32 py-3 bg-green-400 rounded-lg hover:bg-green-500"
              onClick={() => {
                setJoinRoom(true);
                setHeading("Enter Details");
                return;
              }}
            >
              Join Room
            </button>
          </div>
        )}
      </div>
      {joinRoom && (
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center ">
            <input
              type="text"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              className="h-10 w-1/3 rounded-lg pl-3 mr-5 text-black outline-none focus:border-b-2 focus:border-green-400"
              placeholder="Room Id ..."
            />
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="h-10 w-1/3 rounded-lg pl-3 mr-5 text-black outline-none focus:border-b-2 focus:border-green-400"
              placeholder="UserName ..."
            />
          </div>
          <button
            className="w-32 py-3 bg-green-400 rounded-lg hover:bg-green-500 "
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      )}
      {createRoom && (
        <div className="text-center space-y-2">
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="h-12 w-1/2 rounded-lg pl-3 mr-5 text-black outline-none focus:border-b-2 focus:border-red-400"
            placeholder="UserName ..."
          />

          <button
            className="w-32 py-3 bg-red-400 rounded-lg hover:bg-red-500 "
            onClick={handleCreateRoom}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
}

export default ChoiceRoom;
