import React from "react";
import { useSignupForm } from "../../CustomHooks/forms";
import checkValidity from "./CheckValidity";

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
  //passs initial form values and callback function for submit Handler
  const {
    input,
    inputChangeHandler,
    submitHandler,
    errors,
    errorMessage
  } = useSignupForm(
    {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    checkValidity
  );

  // let errortxt = null;
  // if (errorMessage) {
  //   errortxt = errorMessage;
  // } else if (errors.email) {
  //   errortxt = errors.email;
  // }

  let message = null;
  if (errors.confirmPassword) {
    message = <Message error>{errors.confirmPassword}</Message>;
  }
  if (errors.password) {
    message = <Message error>{errors.password}</Message>;
  }
  if (errors.email) {
    message = <Message error>{errors.email}</Message>;
  }
  if (errors.userName) {
    message = <Message error>{errors.userName}</Message>;
  }
  if (errorMessage) {
    message = <Message error>{errorMessage}</Message>;
  }

  return (
    <Grid centered verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: "450px" }}>
        <Header as="h2" textAlign="center" color="orange">
          <Icon color="orange" name="puzzle piece" />
          Register for Dev Chat
        </Header>
        {message}
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
