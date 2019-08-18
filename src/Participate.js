import React, { useEffect, useState, useRef, useContext } from "react";
import socketIOClient from "socket.io-client";
import EyeDropper from "react-eyedropper";
import UserContext from "./UserContext";

import "./fix.css";
import background from "./images/background.gif";
import header from "./images/header.png";

const socket = socketIOClient(process.env.REACT_APP_SERVER_URL, {
  rejectUnauthorized: false
});
// let's assume that the client page, once rendered, knows what room it wants to join
const room = "compose";

export default function Spectate() {
  const [color, setColor] = useState({ r: 225, g: 198, b: 153 });
  const [val, setVal] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rgb, setRGB] = useState({ r: 225, g: 198, b: 153 });
  const ref = useRef(null);
  const user = useContext(UserContext);
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

  const handleChange = e => {
    setVal(e.target.value);
    socket.emit("sliderSpectate", val);
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

    const seventhX = Math.round(w / 7);
    const seventhY = Math.round(h / 7);
    // Radius

    const midW = w / 2;
    const midH = h / 2;

    let centredX = Math.round(mousePos.x - midW);
    let centredY = Math.round(mousePos.y - midH);
    // console.log("centredX", centredX);
    // console.log("centredY", centredY);

    // Red x & y coords
    let centredRX = Math.round((mousePos.x - seventhX) * 0.9);
    let centredRY = Math.round((mousePos.y - seventhY) * 0.9);
    // console.log("CEN-R", centredRX, centredRY);
    // Blue x & y coords
    let centredGX = Math.round((centredX - seventhX) * 2);
    let centredGY = Math.round(mousePos.y - seventhY * 4.5);
    // console.log("CEN-G", centredGX, centredGY);
    // Green x & y coords
    let centredBX = Math.round(mousePos.x - seventhX * 6);
    let centredBY = Math.round(mousePos.y - seventhY * 2.4);
    // console.log("CEN-B", centredBX, centredBY);
    // Violet x & y coords
    let centredVX = Math.round(mousePos.x - seventhX * 3.5);
    let centredVY = Math.round(mousePos.y - seventhY * 2);
    // console.log("CEN-V", centredVX, centredVY);

    const radius = Math.sqrt(seventhX * 4 * (seventhX * 4));
    // console.log("radius", radius);

    function calPercent(centR, radius) {
      let dis = Math.sqrt(centR * centR);
      let percent = Math.round((dis * 100) / radius) / 100;
      percent = percent > 1 ? 1 : percent;
      let result = 255 - 255 * percent;
      return result;
    }
    // console.log("percent", percent);

    let R = Math.round(calPercent(centredRX, radius));
    let G = Math.round(calPercent(centredGY, radius * 0.7));
    let B = Math.round(calPercent(centredBX, radius));

    // setColor(`rgb(${R}, ${G}, ${calPercent(centredBX, radius)})`);

    //====================================================

    function rgb2hsl(rgbArr) {
      var r1 = rgbArr[0] / 255;
      var g1 = rgbArr[1] / 255;
      var b1 = rgbArr[2] / 255;

      var maxColor = Math.max(r1, g1, b1);
      var minColor = Math.min(r1, g1, b1);
      //Calculate L:
      var L = (maxColor + minColor) / 2;
      var S = 0;
      var H = 0;
      if (maxColor != minColor) {
        //Calculate S:
        if (L < 0.5) {
          S = (maxColor - minColor) / (maxColor + minColor);
        } else {
          S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if (r1 == maxColor) {
          H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 == maxColor) {
          H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
          H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
      }

      L = L * 100;
      S = S * 100;
      H = H * 60;
      if (H < 0) {
        H += 360;
      }
      var result = [Math.floor(H), Math.floor(S), Math.floor(L)];
      return result;
    }

    //====================================================
    setColor(
      `hsl(${rgb2hsl([R, G, B])[0]}, ${rgb2hsl([R, G, B])[1]}%, ${
        rgb2hsl([R, G, B])[2]
      }%)`
    );

    // socket.emit(
    //     "rgbvalues",
    //     `${calPercent(centredRX, radius)}, ${calPercent(
    //       centredGY,
    //       radius * 0.7
    //     )}, ${B}`
    //   );

    socket.emit(
      "hslValues",
      `${rgb2hsl([R, G, B])[0]}, ${rgb2hsl([R, G, B])[1]}, ${
        rgb2hsl([R, G, B])[2]
      }`
    );

    function getBaseCol(arr) {
      let h = arr[0];

      if (h >= -1 && h <= 19) return "red";
      if (h >= 19 && h <= 67) return "orange";
      if (h >= 67 && h <= 129) return "yellow";
      if (h >= 129 && h <= 179) return "green";
      if (h >= 179 && h <= 244) return "blue";
      if (h >= 244 && h <= 279) return "orange";
      if (h >= 279 && h <= 340) return "violet";
      if (h >= 340) return "red";
    }

    console.log("baseCol", getBaseCol(rgb2hsl([R, G, B])));

    socket.emit("baseCol");
    socket.emit("borderColor", { R, G, B });

    return { R, G, B };
  };

  const eyeDropper = ({ r, g, b }) => {
    // setRGB({ r: r, g: g, b: b });
    setColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
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

  const slider = {
    padding: "30px",
    margin: "40px"
  };

  const wrapper = {
    padding: "4vw"
  };

  return (
    <div className="spectators" style={container}>
      {/* <div className="result">
        <div
          className="container "
          style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
        >
          rgb({rgb.r}, {rgb.g}, {rgb.b})
        </div>
      </div> */}
      {/* <div className="eye-drop-container">
        <EyeDropper initializedColor={eyeDropper} />
      </div> */}
      <img src={header} alt="header" style={headerStyle} />
      <div
        ref={ref}
        className="imageWrapper"
        onMouseMove={mouseMove}
        onTouchMove={mouseMove}
      >
        <img src={background} alt="geodesic pattern" style={mainImage} />
      </div>
    </div>
  );
}
