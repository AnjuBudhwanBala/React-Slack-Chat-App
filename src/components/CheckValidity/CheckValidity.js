export const CheckValidity = input => {
  let errors = {};

  if (input.hasOwnProperty("userName") && input.userName === "") {
    errors.userName = "UserName is Required";
  }
  if (input.hasOwnProperty("email") && input.email === "") {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Email address is invalid";
  }
  if (input.hasOwnProperty("password") && input.password === "") {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  }
  if (input.hasOwnProperty("confirmPassword") && input.confirmPassword === "") {
    errors.confirmPassword = "Confirm Password is required";
  } else if (
    input.hasOwnProperty("confirmPassword") &&
    input.confirmPassword !== input.password
  ) {
    errors.confirmPassword = "Confirm Password is not match to Password";
  }

  return errors;
};
