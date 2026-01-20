import React, { ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./modal.module.css";
import { useOutsideAlerter } from "..";

export type ModalProps = {
  children: ReactNode;
  onClickedOutside?: () => void;
  className?: string;
};

export const Modal = ({ className, children, onClickedOutside }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { hasClickedOutside } = useOutsideAlerter(ref);

  useEffect(() => {
    if (onClickedOutside && hasClickedOutside) {
      onClickedOutside();
    }
  }, [hasClickedOutside]);

  return (
    <div className={clsx(styles.overlay, className)}>
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </div>
  );
};
