import React from "react";
import LanguageSelector from "./LanguageSelector";

export default {
  title: "LanguageSelector",
  component: LanguageSelector,
};

export const Basic = () => {
  return <LanguageSelector languages={["fr", "ye", "vu", "uz"]} />;
};
