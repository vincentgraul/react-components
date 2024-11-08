import { Loader } from "../../src";

export default {
  title: "Loader",
  component: Loader,
};

export const Basic = () => <Loader>In progress...</Loader>;

export const WithImage = () => (
  <Loader src="../../stories/assets/loader/white-loader.svg" text="In progress..." />
);
