import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  render: () => ReactNode;
  className?: string;
}

export default function Loader(props: Props): JSX.Element {
  const { render, className } = props;

  return (
    <Overlay className={`loader-overlay ${className}`}>
      <Container className="loader-container">{render()}</Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  z-index: 2;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50%;
  color: #f9fbff;
`;
