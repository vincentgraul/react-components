import React, { ReactNode, useEffect, useRef } from "react";
import styles from "./modal.module.css";
import { useOutsideAlerter } from "..";

type Props = {
  children: ReactNode;
  onClickedOutside?: () => void;
};

export const Modal = ({ children, onClickedOutside }: Props) => {
  const ref = useRef(null);
  const { hasClickedOutside } = useOutsideAlerter(ref);

  useEffect(() => {
    if (onClickedOutside && hasClickedOutside) {
      onClickedOutside();
    }
  }, [hasClickedOutside]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </div>
  );
};
