import styled from 'styled-components';
import GameBoard from './GameBoard';
import MatchLogo from './MatchLogo';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const MatchGameScreen = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Container>
      {!ready && <LoadingSpinner />}
      {ready && (
        <>
          <MatchLogo />
          <Title>
            MATCH GAME{' '}
            <span style={{ color: 'rgb(91, 186, 111)', marginLeft: '4px' }}>
              .
            </span>
          </Title>
          <GameBoard />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: rgb(238, 238, 240);
  letter-spacing: 4px;
  margin-bottom: 20px;
  text-shadow: rgba(91, 186, 111, 0.12) 0px 0px 20px;
`;

export default MatchGameScreen;
