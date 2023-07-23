import React from "react";
import Loader from "./Loader";
import ImageLoader from "./image-loader/ImageLoader";

export default {
  title: "Loader",
  component: Loader,
};

export const Basic = () => {
  return (
    <Loader
      render={() => (
        <ImageLoader src="../../stories/assets/loader/white-loader.svg" text="En cours..." />
      )}
    />
  );
};
