import React from "react";

import VisualInterface from "./VisualInterface";

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
      <VisualInterface />
    </div>
  );
};

export default App;
