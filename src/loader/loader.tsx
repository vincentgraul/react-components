import React, { ReactNode } from "react";
import styles from "./loader.module.css";

type LoaderProps = {
  children: ReactNode;
};

type LoaderWithImageProps = {
  src: string;
  text: string;
};

export const Loader = (props: LoaderProps | LoaderWithImageProps) => {
  const Root = ({ children }: LoaderProps) => (
    <div className={styles.overlay}>
      <div className={styles.container}>{children}</div>
    </div>
  );

  const LoaderWithImage = ({ src, text }: LoaderWithImageProps) => (
    <Root>
      <div className={styles["image-container"]}>
        <img className={styles.image} src={src} alt="loader-image"></img>
        <span>{text}</span>
      </div>
    </Root>
  );

  return "children" in props ? Root(props) : LoaderWithImage(props);
};
