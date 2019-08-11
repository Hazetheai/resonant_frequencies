import React, { useState } from "react";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);

const SocketIOForm = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");

  const onSubmitName = e => {
    e.preventDefault();
    socket.emit("talkbackN", userName);

    setUserName("");
  };

  const onSubmitAge = e => {
    e.preventDefault();
    socket.emit("talkbackA", userAge);
    console.log("userAge", userAge);
    setUserAge("");
  };

  return (
    <div>
      <form onSubmit={onSubmitName}>
        <input
          onChange={e => setUserName(e.target.value)}
          value={userName}
          type="text"
          id="name"
          placeholder="Write your name here"
        />
        <button type="submit">Submit Name</button>
      </form>
      <form onSubmit={onSubmitAge}>
        <input
          onChange={e => setUserAge(e.target.value)}
          value={userAge}
          type="text"
          id="age"
          placeholder="Write your age here"
        />
        <button type="submit">Submit Age</button>
      </form>
    </div>
  );
};

export default SocketIOForm;
