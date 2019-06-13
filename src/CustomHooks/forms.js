import { useState } from "react";

export const useSignupForm = (initialValues, callback, checkValidity) => {
  const [input, setInput] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(input => ({ ...input, [name]: value }));
    setErrors(checkValidity(input));
  };

  //for Signup a new user
  const submitHandler = e => {
    e.preventDefault();
    setErrors(checkValidity(input));
  };

  return { input, inputChangeHandler, submitHandler, errors };
};
