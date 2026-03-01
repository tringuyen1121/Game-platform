import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { CardData } from '../../types/card';
import { useCallback, useState } from 'react';
import CardFront from './CardFront';

interface MatchCardProps {
  card: CardData;
  isMatched: boolean;
  isFlipped: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const MatchCard = ({
  card,
  onClick,
  isFlipped,
  isMatched,
  disabled,
}: MatchCardProps) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [onClick, disabled]);

  return (
    <CardContainer
      whileHover={
        !disabled
          ? {
              scale: 1.1,
              filter: 'brightness(1.2)',
              boxShadow: `0 0 5px #ffffff10`,
              transition: {
                boxShadow: {
                  repeatType: 'mirror',
                  repeat: Infinity,
                  duration: 0.75,
                  ease: 'linear',
                },
              },
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.9 } : {}}
      animate={{
        ...(isFlipped && !isMatched
          ? {
              boxShadow: `0 0 10px ${card.symbol.glow}`,
              transition: {
                boxShadow: {
                  repeatType: 'mirror',
                  repeat: Infinity,
                  duration: 0.75,
                  ease: 'linear',
                },
              },
            }
          : {}),
      }}
      style={isMatched ? { boxShadow: `0 0 20px ${card.symbol.glow}` } : {}}
      onClick={handleClick}
    >
      <InnerContainer
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        isFlipped={isFlipped}
      >
        <BackFace>
          <BackFacePattern />
        </BackFace>

        <CardFront symbol={card.symbol} isMatched={isMatched} />
      </InnerContainer>
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  width: 84px;
  height: 84px;
  border-radius: 8px;
`;

const InnerContainer = styled(motion.div)<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const BackFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background: linear-gradient(145deg, #1a1a30, #12122a);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backface-visibility: hidden;
`;

const BackFacePattern = styled.div`
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(45deg, rgb(255, 255, 255) 25%, transparent 25%),
    linear-gradient(-45deg, rgb(255, 255, 255) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(255, 255, 255) 75%),
    linear-gradient(-45deg, transparent 75%, rgb(255, 255, 255) 75%);
  background-position:
    0 0,
    0 6px,
    6px -6px,
    -6px 0px;
  background-size: 12px 12px;
  opacity: 0.05;
`;

export default MatchCard;
