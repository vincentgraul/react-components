import React from "react";
import CountrySelector from "./CountrySelector";

export default {
  title: "CountrySelector",
  component: CountrySelector,
};

export const Basic = () => {
  return <CountrySelector languages={["fr", "ye", "vu", "uz"]} />;
};
