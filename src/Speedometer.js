import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import socketIOClient from "socket.io-client";

const Speedometer = () => {
  const [useResponse, setResponse] = useState(0);
  useEffect(() => {
    const socket = socketIOClient("https://192.168.0.145:7879");
    if (socket) console.log("socket", socket);
    console.log(
      "process.env.REACT_APP_SERVER_URL",
      process.env.REACT_APP_SERVER_URL
    );
    socket.on("outgoing data", data => {
      setResponse(data.num);
    });
    // socket.on("message", data => setResponse(data));
  }, []);
  return (
    <ReactSpeedometer
      maxValue={140}
      value={useResponse}
      needleColor="black"
      startColor="orange"
      segments={10}
      endColor="red"
      needleTransition={"easeElastic"}
      ringWidth={30}
      textColor={"red"}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto"
      }}
    />
  );
};

export default Speedometer;
