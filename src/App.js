import React from "react";
import SocketIOForm from "./socketForm";
import SocketOutput from "./SocketOutput";
import Speedometer from "./Speedometer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Speedometer} />
      <Route exact path="/input" component={SocketIOForm} />
      <Route exact path="/ouput" component={SocketOutput} />
    </Router>
  );
};

export default App;
