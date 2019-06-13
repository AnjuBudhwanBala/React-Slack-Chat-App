import React from "react";
import { useSignupForm } from "../../CustomHooks/forms";
import checkValidity from "./CheckValidity";
import axios from "../../axios";
import classes from "./Auth.module.css";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Register = () => {
  //for Signup new User
  const signup = () => {
    const authData = {
      email: input.email,
      password: input.password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAiwB45z0-ipLLCp7f1DHUz9xVv08UmRDo",
        authData
      )
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  //passs initial form values and callback function for submit Handler
  const { input, inputChangeHandler, submitHandler, errors } = useSignupForm(
    {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    signup,
    checkValidity
  );

  return (
    <Grid centered verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: "450px" }}>
        <Header as="h2" textAlign="center" color="orange">
          <Icon color="orange" name="puzzle piece" />
          Register for Dev Chat
        </Header>
        <Segment>
          <Form size="large" onSubmit={submitHandler}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="UserName"
              type="text"
              name="userName"
              value={input.userName}
              onChange={inputChangeHandler}
            />
            {errors.userName && (
              <p className={classes.error}>{errors.userName}</p>
            )}
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="email"
              type="email"
              name="email"
              value={input.email}
              onChange={inputChangeHandler}
            />
            {errors.email ? (
              <p className={classes.error}>{errors.email}</p>
            ) : null}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={input.password}
              onChange={inputChangeHandler}
            />
            {errors.password && (
              <p className={classes.error}>{errors.password}</p>
            )}
            <Form.Input
              fluid
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Passsword"
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={inputChangeHandler}
            />
            {errors.confirmPassword && (
              <p className={classes.error}>{errors.confirmPassword}</p>
            )}
            <Button color="orange" fluid size="large">
              Sign Up
            </Button>
          </Form>
        </Segment>

        <Message>
          Already Registerd? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
