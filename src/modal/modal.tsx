import React, { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutsideAlerter } from "..";

type Props = {
  children: ReactNode;
  onClickedOutside?: () => void;
  className?: string;
};

export const Modal = (props: Props): JSX.Element | null => {
  const { className, children, onClickedOutside } = props;
  const ref = useRef(null);
  const { hasClickedOutside } = useOutsideAlerter(ref);

  useEffect(() => {
    if (onClickedOutside && hasClickedOutside) {
      onClickedOutside();
    }
  }, [hasClickedOutside]);

  return (
    <Overlay className={`modal-overlay ${className}`}>
      <Container className="modal-content" ref={ref}>
        {children}
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  z-index: 1;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #f9fbff;
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 1;
  margin: 5rem 0 5rem 0;
`;
