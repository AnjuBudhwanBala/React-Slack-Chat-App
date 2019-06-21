import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
