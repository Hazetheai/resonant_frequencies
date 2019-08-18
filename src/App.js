import React from "react";

import { UserProvider } from "./UserContext";
import Spectate from "./Spectate";
import Participate from "./Participate";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <UserProvider value={"user"}>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            justifyContent: "center",
            backgroundColor: "#e1c699"
          }}
        >
          <Route path="/" component={Spectate} />
          <Route path="/" component={Participate} />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
