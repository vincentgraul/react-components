import React, { ReactNode } from "react";
import styles from "./loader.module.css";

type Props = {
  render: () => ReactNode;
};

export const Loader = ({ render }: Props) => (
  <div className={styles.overlay}>
    <div className={styles.container}>{render()}</div>
  </div>
);
