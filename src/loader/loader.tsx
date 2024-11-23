import React, { ReactNode } from "react";
import clsx from "clsx";
import styles from "./loader.module.css";

type LoaderProps = {
  children: ReactNode;
  className?: string;
};

type LoaderWithImageProps = {
  src: string;
  text: string;
  className?: string;
};

export const Loader = (props: LoaderProps | LoaderWithImageProps) => {
  const Root = ({ className, children }: LoaderProps) => (
    <div className={clsx(styles.overlay, className)}>
      <div className={styles.container}>{children}</div>
    </div>
  );

  const LoaderWithImage = ({ className, src, text }: LoaderWithImageProps) => (
    <Root className={className}>
      <div className={styles["image-container"]}>
        <img className={styles.image} src={src} alt="loader-image"></img>
        <span>{text}</span>
      </div>
    </Root>
  );

  return "children" in props ? Root(props) : LoaderWithImage(props);
};
