import React, { useState } from "react";
import useForm from "../CustomHooks/form";
import firebase from "../firebase";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [submitError, setSubmitError] = useState("");
  const initialValues = {
    email: "",
    password: ""
  };

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
      .then(createdUser => {
        console.log(createdUser);
        setSubmitError("");
      })
      .catch(error => {
        console.log(error);
        setSubmitError(error.code);
      });
  };
  //passs initial form values and callback function for submit Handler
  const { input, inputChangeHandler, submitHandler, errors } = useForm(
    initialValues,
    signIn
  );

  //Error messages on submit
  let errorMessage = null;

  if (errors.password) {
    errorMessage = <Message error>{errors.password}</Message>;
  }
  if (errors.email) {
    errorMessage = <Message error>{errors.email}</Message>;
  }

  if (submitError) {
    errorMessage = <Message error>{submitError}</Message>;
  }

  return (
    <Grid centered verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: "450px" }}>
        <Header as="h2" textAlign="center" color="violet">
          <Icon color="violet" name="code branch" />
          Login for Dev Chat
        </Header>
        {errorMessage}
        <Segment stacked>
          <Form size="large" onSubmit={submitHandler} autoComplete="none">
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="email"
              type="email"
              name="email"
              value={input.email}
              onChange={inputChangeHandler}
              autoComplete="email"
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
              autoComplete="password"
            />
            <Button color="violet" fluid size="large">
              Sign In
            </Button>
          </Form>
        </Segment>

        <Message>
          Not Registerd? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
