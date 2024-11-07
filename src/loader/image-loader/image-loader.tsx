import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  src: string;
  text: string;
  className?: string;
};

export const ImageLoader = (props: Props) => {
  const { className, src, text } = props;

  return (
    <Container className={`image-loader-container ${className}`}>
      <Image className="image-loader-icon" src={src}></Image>
      <span className="image-loader-text">{text}</span>
    </Container>
  );
};

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
