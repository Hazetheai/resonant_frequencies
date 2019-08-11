import React from "react";
import SocketIOForm from "./socketForm";
import SocketOutput from "./SocketOutput";
import Speedometer from "./Speedometer";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "460px",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Speedometer />
      <SocketOutput />
      <SocketIOForm />
    </div>
  );
};

export default App;
