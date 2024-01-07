import React from "react";
import Input from "./Input";

export default {
  title: "Input",
  component: Input,
};

export const Basic = () => {
  return (
    <Input
      name="firstname"
      type="text"
      label="firstname"
      autoComplete="off"
      colors={{
        default: "grey",
        error: "red",
        focus: "blue",
        success: "green",
        warning: "orange",
      }}
    />
  );
};

export const withMessage = () => {
  return (
    <Input
      name="firstname"
      type="text"
      label="firstname"
      message="firstname error"
      status="error"
      autoComplete="off"
      colors={{
        default: "grey",
        error: "red",
        focus: "blue",
        success: "green",
        warning: "orange",
      }}
    />
  );
};
