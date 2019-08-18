import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import "./fix.css";
import background from "./images/background.gif";
import header from "./images/header.png";

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL, {
  rejectUnauthorized: false
});
// let's assume that the client page, once rendered, knows what room it wants to join
const room = "spectate";

export default function Spectate(props) {
  const ref = useRef(null);

  const [color, setColor] = useState({ r: 225, g: 198, b: 153 });
  const [mousePos, setMousePosSpec] = useState({ x: 0, y: 0 });

  socket.on("borderColor", data => {
    setColor(`rgb(${data.R}, ${data.G}, ${data.B})`);
  });

  useEffect(() => {
    socket.on("connect", function() {
      // Connected, let's sign-up for to receive messages for this room
      socket.emit("room", room);
    });
    socket.on("message", function(data) {
      console.log("Incoming message from participants: ", data);
    });

    socket.on("bci", data => {
      console.log("data", data);
      setColor(data);
    });
  }, []);

  socket.on("ALDSJSD", mousePos => {
    setMousePosSpec(mousePos);
    console.log("mousePos", mousePos);
  });

  //   CSS
  const mainImage = {
    maxWidth: "50vw"
  };
  const headerStyle = {
    width: "70vw",
    marginBottom: "-30px"
  };

  const container = {
    display: "flex",
    padding: "30px",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e1c699",
    borderStyle: "solid",
    borderWidth: "20px",
    borderColor: color
  };
  return (
    <div className="spectators" style={container}>
      <img src={header} alt="header" style={headerStyle} />
      <div ref={ref} className="imageWrapper">
        <img src={background} alt="geodesic pattern" style={mainImage} />
      </div>
    </div>
  );
}
