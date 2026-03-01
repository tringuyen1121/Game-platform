import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { CardSymbol } from '../../types/card';

interface CardFrontProps {
  symbol: CardSymbol;
  isMatched?: boolean;
}

const CardFront = ({ symbol, isMatched }: CardFrontProps) => {
  return (
    <Container
      $background={symbol.background}
      $boxShadow={symbol.glow}
      isMatched={isMatched}
    >
      <motion.span
        animate={
          isMatched ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}
        }
        transition={{
          duration: 0.5,
        }}
        style={{ fontSize: '28px' }}
      >
        {symbol.icon}
      </motion.span>
    </Container>
  );
};

const Container = styled(motion.div)<{
  $background: string;
  $boxShadow: string;
  isMatched?: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: ${({ isMatched }) =>
    isMatched
      ? '2px solid rgba(255, 255, 255, 0.3)'
      : '1px solid rgba(255, 255, 255, 0.1)'};
  background: ${({ $background }) => $background};
  backface-visibility: hidden;
  transform: rotateY(180deg);
  pointer-events: none;

  ${({ isMatched }) =>
    isMatched &&
    `
    &:after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background:linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%);
    position: absolute;
  }
    `}
`;

export default CardFront;
