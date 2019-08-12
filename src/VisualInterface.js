import React, { useState } from "react";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.REACT_APP_SERVER_URL);

const VisualInterface = () => {
  const [periodVal, setPeriodVal] = useState(10);
  const [granVal, setGranVal] = useState(1);
  const [scaleVal, setScaleVal] = useState(20);

  const handleChangeP = e => {
    setPeriodVal(e.target.value);
    socket.emit("sliderPeriod", periodVal);
    console.log("sliderPeriod", periodVal);
  };
  const handleChangeG = e => {
    setGranVal(e.target.value);
    socket.emit("sliderGranularity", granVal);
    console.log("sliderGranularity", granVal);
  };
  const handleChangeS = e => {
    setScaleVal(e.target.value);
    socket.emit("sliderScale", scaleVal);
    console.log("sliderScale", scaleVal);
  };

  const chooseBasis = e => {
    socket.emit("basis", e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const chooseShape = e => {
    socket.emit("shape", e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const button = {
    padding: "20px",
    margin: "10px",
    borderRadius: "5%",
    width: "85px"
  };

  const container = {
    padding: "30px",
    marginTop: "20px",
    display: "flex"
  };

  const slider = {
    transform: "rotate(270deg)"
  };

  return (
    <div>
      <div style={container} className="basis">
        <button
          style={button}
          type="submit"
          value="noise.cell"
          onClick={chooseBasis}
        >
          Cell
        </button>
        <button
          style={button}
          type="submit"
          value="noise.distorted"
          onClick={chooseBasis}
        >
          distorted
        </button>
        <button
          style={button}
          type="submit"
          value="fractal.hetero"
          onClick={chooseBasis}
        >
          Hetero
        </button>
        <button
          style={button}
          type="submit"
          value="transfer.saw"
          onClick={chooseBasis}
        >
          Saw
        </button>
      </div>
      <div style={container} className="shape">
        <button
          style={button}
          type="submit"
          value="sphere"
          onClick={chooseShape}
        >
          Sphere
        </button>
        <button
          style={button}
          type="submit"
          value="cylinder"
          onClick={chooseShape}
        >
          Cylinder
        </button>
        <button
          style={button}
          type="submit"
          value="capsule"
          onClick={chooseShape}
        >
          Capsule
        </button>
        <button
          style={button}
          type="submit"
          value="torus"
          onClick={chooseShape}
        >
          Torus
        </button>
      </div>

      <div className="sliders" style={container}>
        <div style={slider} className="period">
          <input
            onChange={handleChangeP}
            type="range"
            min="0"
            step="1"
            max="20"
            value={periodVal}
          />
        </div>
        <div style={slider} className="granularity">
          <input
            onChange={handleChangeG}
            type="range"
            step=".001"
            min="0"
            max="2"
            value={granVal}
          />
        </div>
        <div style={slider} className="scale">
          <input
            onChange={handleChangeS}
            type="range"
            min="0"
            step="1"
            max="40"
            value={scaleVal}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualInterface;
