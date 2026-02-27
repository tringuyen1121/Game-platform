import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <Container>
      <Spinner>
        <SpinnerRing></SpinnerRing>
        <SpinnerRing></SpinnerRing>
        <SpinnerRing></SpinnerRing>
      </Spinner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

const Spinner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  &:nth-child(1) {
    border-top-color: #00d4ff;
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    border-top-color: #7b2ff7;
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    border-top-color: #ff006e;
    animation-delay: -0.15s;
  }
`;

export default LoadingSpinner;
