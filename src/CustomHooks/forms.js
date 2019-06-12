import { useState } from "react";

export const useSignupForm = initialValues => {
  const [input, setInput] = useState(initialValues);

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(input => ({ ...input, [name]: value }));
  };
  const submitHandler = e => {
    e.preventDefault();
  };
  return { input, inputChangeHandler, submitHandler };
};
