import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  totalCards: number;
  matchedPairs: number;
}

const ProgressBar = ({ totalCards, matchedPairs }: ProgressBarProps) => {
  const progressPercent = (matchedPairs / (totalCards / 2)) * 100;

  return (
    <ProgressContainer>
      <motion.div
        animate={{ width: `${progressPercent}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #5BBA6F, #45B8AC)',
          boxShadow:
            progressPercent > 0 ? '0 0 10px rgba(91,186,111,0.4)' : 'none',
        }}
      />
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default ProgressBar;
