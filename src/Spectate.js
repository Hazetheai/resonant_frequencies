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

export default function Spectate() {
  const ref = useRef(null);

  const [color, setColor] = useState({ r: 225, g: 198, b: 153 });
  const [val, setVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
  console.log("socket", socket.io);

  const handleChange = e => {
    setVal(e.target.value);
    console.log("sliderSpectate", val);
  };

  const mouseMove = e => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    const height = ref.current ? ref.current.offsetHeight : 0;

    console.log("width", width);
    setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    let imageWidth = width;
    let imageHeight = height;

    const w = Math.round(parseInt(imageWidth));
    const h = Math.round(parseInt(imageHeight));

    console.log("mousePos", mousePos);
    socket.on("borderColor", data => {
      console.log("data", data);
    });
  };

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
      <h3>spectate</h3>
      <img src={header} alt="header" style={headerStyle} />
      <div ref={ref} className="imageWrapper" onTouchMove={mouseMove}>
        <img src={background} alt="geodesic pattern" style={mainImage} />
      </div>
    </div>
  );
}
