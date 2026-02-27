import { motion } from 'framer-motion';
import styled from 'styled-components';

interface GameCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
}

const GameCard = ({ title, description, color, index }: GameCardProps) => {
  return (
    <GameCardContainer
      $color={color}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1, duration: 0.5 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 10px 40px ${color}40`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <CardGlow $color={color} />
      <h3>{title}</h3>
      <p>{description}</p>
      <PlayButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        Play Now
      </PlayButton>
    </GameCardContainer>
  );
};

const CardGlow = styled.div<{ $color: string }>`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  background: ${({ $color }) => $color};
`;

const GameCardContainer = styled(motion.div)<{ $color: string }>`
  background: ${({ $color }) =>
    `linear-gradient(135deg, ${$color}22, ${$color}11)`};
  position: relative;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(10px);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  &:hover {
    ${CardGlow} {
      opacity: 0.1;
    }
  }
`;

const PlayButton = styled(motion.button)`
  background: linear-gradient(90deg, #00d4ff, #7b2ff7);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

export default GameCard;
