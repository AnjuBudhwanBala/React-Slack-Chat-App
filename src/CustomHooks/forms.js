import { useState, useEffect } from "react";
import firebase from "../firebase";

export const useSignupForm = (initialValues, checkValidity) => {
  const [input, setInput] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(input => ({ ...input, [name]: value }));
    // setErrors(checkValidity(input));
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        signup();
      }
    },
    [errors]
  );

  //for Signup a new user
  const signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(input.email, input.password)
      .then(response => console.log(response))
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const submitHandler = e => {
    e.preventDefault();
    setErrors(checkValidity(input));
    setIsSubmitting(true);
  };

  return {
    input,
    inputChangeHandler,
    submitHandler,
    errors,
    errorMessage
  };
};
