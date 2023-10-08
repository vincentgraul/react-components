import React from "react";
import Select from "./Select";

export default {
  title: "Select",
  component: Select,
};

export const Basic = () => {
  return (
    <Select
      options={[
        { label: "France", value: "fr" },
        { label: "England", value: "en" },
        { label: "Italy", value: "it" },
        { label: "Scotland", value: "sc" },
      ]}
    />
  );
};

export const WithSelectedOption = () => {
  return (
    <Select
      selectedValue="it"
      options={[
        { label: "France", value: "fr" },
        { label: "England", value: "en" },
        { label: "Italy", value: "it" },
        { label: "Scotland", value: "sc" },
      ]}
    />
  );
};
