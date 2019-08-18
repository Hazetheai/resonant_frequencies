import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const SocketOutput = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_SERVER_URL, {
      rejectUnauthorized: false
    });
    socket.on("message", msg => setMessage(msg));
  }, []);

  return (
    <div>
      <div id="container">
        <div id="message">{message}</div>
      </div>
    </div>
  );
};

export default SocketOutput;
