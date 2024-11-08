import React from "react";
import styles from "./image-loader.module.css";

type Props = {
  src: string;
  text: string;
};

export const ImageLoader = ({ src, text }: Props) => (
  <div className={styles.container}>
    <img className={styles.image} src={src}></img>
    <span>{text}</span>
  </div>
);
