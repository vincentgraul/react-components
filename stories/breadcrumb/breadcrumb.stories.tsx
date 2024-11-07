import { useBreadcrumb, Breadcrumb } from "../../src";

export default {
  title: "useBreadcrumb",
  component: useBreadcrumb,
};

export const Basic = () => {
  return (
    <Breadcrumb
      url={
        new URL(
          "https://stackoverflow.com/questions/39334400/how-to-split-url-to-get-url-path-in-javascript?value=3&name=5",
        )
      }
      onClick={(element) => {
        console.log(element);
      }}
    ></Breadcrumb>
  );
};
