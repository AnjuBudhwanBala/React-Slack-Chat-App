import React, { useEffect } from "react";
import firebase from "firebase/app";
import { Switch, Route, withRouter } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "./store/actionTypes/actionTypes";
import Spinner from "./components/UI/Spinner";
import "./App.css";

function App(props) {
  const isLoading = useSelector(state => state.user.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        props.history.push("/");
        //store user in store
        dispatch({ type: actionTypes.SET_USER, currentUser: user });
      } else {
        props.history.push("/login");
        //clear User from store
        dispatch({ type: actionTypes.CLEAR_USER });
      }
    });
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" exact component={Chat} />
    </Switch>
  );
}

export default withRouter(App);
