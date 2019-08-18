import React, { useState } from "react";
import socketIOClient from "socket.io-client";
import "./fix.css";
const socket = socketIOClient(process.env.REACT_APP_SERVER_URL, {
  rejectUnauthorized: false
});

const SocketIOForm = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [sliderVal, setSliderVal] = useState(0);
  const onSubmit = e => {
    e.preventDefault();
    socket.emit("talkbackN", userName);
    socket.emit("talkbackA", userAge);

    setUserName("");
    setUserAge("");
  };
  const handleChange = e => {
    setSliderVal(e.target.value);
    socket.emit("slider", sliderVal);
    console.log("userName", userName);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={e => setUserName(e.target.value)}
          value={userName}
          type="text"
          id="name"
          placeholder="Write your name here"
        />
        <input
          onChange={handleChange}
          type="range"
          min="0"
          max="10"
          value={sliderVal}
        />

        <input
          onChange={e => setUserAge(e.target.value)}
          value={userAge}
          type="text"
          id="age"
          placeholder="Write your age here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SocketIOForm;
