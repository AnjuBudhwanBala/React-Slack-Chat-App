import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import firebase from "firebase";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./store/reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.history.push("/");
      }
    });
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />{" "}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
