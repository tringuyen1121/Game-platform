import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SYMBOLS from '../../lib/symbols';

interface StatsProps {
  movesCount: number;
  isTimeRunning: boolean;
  isVictory: boolean;
  matchedCount: number;
}

const AnimatedNumber = ({ value }: { value: string }) => (
  <MainText
    key={String(value)} // Key change = re-animate
    initial={{ scale: 1.3, color: '#5BBA6F' }}
    animate={{ scale: 1, color: '#eeeef0' }}
    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
  >
    {value}
  </MainText>
);

const Timer = ({ isRunning }: { isRunning: boolean }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1;

        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedTime = `${minutes}:${secs.toString().padStart(2, '0')}`;

  return <AnimatedNumber value={formattedTime} />;
};

const Stats = ({
  movesCount = 0,
  isTimeRunning = false,
  isVictory = false,
  matchedCount = 0,
}: StatsProps) => {
  return (
    <Container>
      <StatsWrapper>
        <AnimatedNumber value={Math.floor(movesCount / 2).toString()} />
        <SubText>MOVES</SubText>
      </StatsWrapper>
      <StatsWrapper>
        <Timer isRunning={isTimeRunning} />
        <SubText>TIME</SubText>
      </StatsWrapper>
      <StatsWrapper>
        <AnimatedNumber value={`${matchedCount}/${SYMBOLS.length}`} />
        <SubText>PAIRS</SubText>
      </StatsWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 20px 34px;
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled(motion.p)`
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: 22px;
  letter-spacing: 2px;
  color: rgb(238, 238, 240);
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 10px;
  color: rgb(85, 85, 112);
  letter-spacing: 2px;
`;

export default Stats;
