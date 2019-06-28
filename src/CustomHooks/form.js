import { useState, useEffect, useCallback } from "react";
import { CheckValidity } from "../components/CheckValidity/CheckValidity";

const useSignupForm = (initialValues, callback) => {
  const [input, setInput] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  //inputChangeHandler
  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(input => ({ ...input, [name]: value }));
  };

  //submitHandler for signup
  const submitHandler = e => {
    e.preventDefault();

    //checking invalid input
    setErrors(CheckValidity(input));
    setSubmitting(true);
  };

  const auth = useCallback(
    () => {
      callback();
    },
    [callback]
  );

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && submitting) {
        auth();
      }
      return () => setSubmitting(false);
    },
    [errors, submitting, auth]
  );

  return {
    input,
    submitHandler,
    inputChangeHandler,
    errors
  };
};

export default useSignupForm;
