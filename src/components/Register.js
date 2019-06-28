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

const Register = () => {
  const [submitError, setSubmitError] = useState("");
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  //firebase auth for register new User
  const signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
      .then(createdUser => {
        setSubmitError("");
        console.log(createdUser);
        return createdUser;
      })
      .then(createdUser => {
        createdUser.user.updateProfile({
          displayName: input.userName,
          photoURL: `https://www.gravatar.com/avatar/{md5(createdUser.user.email)}?d=identicon`
        });
        return createdUser;
      })
      .then(createdUser => {
        firebase
          .database()
          .ref("users")
          .child(createdUser.user.uid)
          .set({
            displayName: input.userName,
            photoURL: `https://www.gravatar.com/avatar/{md5(createdUser.user.email)}?d=identicon`
          });
      })
      .catch(error => {
        console.log(error.message);
        setSubmitError(error.code);
        //setLoading(false);
      });
  };

  //passs initial form values and callback function for submit Handler
  const { input, inputChangeHandler, submitHandler, errors } = useForm(
    initialValues,
    signup
  );

  //Error messages on submit
  let errorMessage = null;
  if (errors.confirmPassword) {
    errorMessage = <Message error>{errors.confirmPassword}</Message>;
  }
  if (errors.password) {
    errorMessage = <Message error>{errors.password}</Message>;
  }
  if (errors.email) {
    errorMessage = <Message error>{errors.email}</Message>;
  }
  if (errors.userName) {
    errorMessage = <Message error>{errors.userName}</Message>;
  }
  if (submitError) {
    errorMessage = <Message error>{submitError}</Message>;
  }

  return (
    <Grid centered verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: "450px" }}>
        <Header as="h2" textAlign="center" color="orange">
          <Icon color="orange" name="puzzle piece" />
          Register for Dev Chat
        </Header>
        {errorMessage}
        <Segment stacked>
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
