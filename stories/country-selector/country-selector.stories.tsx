import { CountrySelector } from "../../src";

export default {
  title: "CountrySelector",
  component: CountrySelector,
};

export const Basic = () => {
  return <CountrySelector languages={["fr", "ye", "vu", "uz"]} />;
};

export const WithValue = () => {
  return <CountrySelector value="vu" languages={["fr", "ye", "vu", "uz"]} />;
};
