import React from "react";
import styled, { keyframes } from "styled-components";

export interface Props {
  src: string;
  text: string;
  className?: string;
}

export default function ImageLoader(props: Props): JSX.Element {
  const { className, src, text } = props;

  return (
    <Container className={`image-loader-container ${className}`}>
      <Image className="image-loader-icon" src={src}></Image>
      <span className="image-loader-text">{text}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const loading = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const Image = styled.img`
  animation: ${loading} 3s linear infinite;
  margin-bottom: 2rem;
`;
