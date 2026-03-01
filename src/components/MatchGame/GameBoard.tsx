import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, px } from 'framer-motion';
import { generateShuffledDeck } from '../../lib/gameLogic';
import MatchCard from './MatchCard';
import { useParticles } from '../../hooks/useParticles';
import type { CardData } from '../../types/card';
import Stats from './Stats';
import ProgressBar from './ProgressBar';

const GameBoard = () => {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Array<[number, number]>>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const cards = useMemo(() => generateShuffledDeck(), []);
  const [victory, setVictory] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const { canvasRef, sparkle, burst } = useParticles();

  useEffect(() => {
    if (boardRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  const handleClick = useCallback(
    (index: number) => {
      if (flipped.length === 2) {
        return;
      }

      if (
        flipped.length === 1 &&
        cards[index].symbol.icon === cards[flipped[0]].symbol.icon
      ) {
        setMatched((prev) => [
          ...prev,
          [cards[index].id, cards[flipped[0]].id],
        ]);
        setTimeout(
          () => handleMatch(flipped[0], index, cards[index].symbol),
          100
        );
        setFlipped([]);
      } else {
        setFlipped((prev) => [...prev, index]);
      }
      setMoveCount((prev) => prev + 1);
      if (!isTimeRunning) {
        setIsTimeRunning(true);
      }
    },
    [flipped]
  );

  const handleMatch = useCallback(
    (firstIndex: number, secondIndex: number, matchedSymbol: any) => {
      if (boardRef.current && canvasRef.current) {
        const boardRect = boardRef.current.getBoundingClientRect();

        [firstIndex, secondIndex].forEach((idx) => {
          const row = Math.floor(idx / 4);
          const col = idx % 4;
          console.log(`Card ${idx} - Row: ${row}, Col: ${col}`);
          // 92 = card size (84) + gap (8)
          const cx = boardRect.left + col * 92 + 46 + 5; // center of card
          const cy = boardRect.top + row * 92 + 46 + 5;
          sparkle(cx, cy, matchedSymbol.glow);
        });
      }
    },
    [sparkle]
  );

  useEffect(() => {
    if (flipped.length === 2) {
      setTimeout(() => setFlipped([]), 700);
    }
  }, [flipped]);

  // Victory check
  useEffect(() => {
    if (matched.length === cards.length / 2) {
      setIsTimeRunning(false);
      setVictory(true);
      if (boardRef.current && canvasRef.current) {
        const boardRect = boardRef?.current?.getBoundingClientRect();
        const cx = boardRect.left + 2 * 92 + 4; // center of board
        const cy = boardRect.top + 2 * 92 + 4;
        burst(cx, cy);
      }
    }
  }, [matched, burst]);

  const isCardDisabled = useCallback(
    (card: CardData, index: number) =>
      flipped.length === 2 ||
      matched.some(([a, b]) => a === card.id || b === card.id) ||
      flipped.includes(index),
    [flipped, matched, cards]
  );

  return (
    <div style={{ position: 'relative' }}>
      <Stats
        movesCount={moveCount}
        isTimeRunning={isTimeRunning}
        isVictory={victory}
        matchedCount={matched.length}
      />
      <Divider />
      <ProgressBar totalCards={cards.length} matchedPairs={matched.length} />
      <Divider />
      <GameBoardContainer ref={boardRef}>
        {cards.map((card, i) => (
          <MatchCard
            key={card.id}
            card={card}
            isFlipped={
              flipped.includes(i) ||
              matched.some(([a, b]) => a === card.id || b === card.id)
            }
            isMatched={matched.some(([a, b]) => a === card.id || b === card.id)}
            onClick={() => handleClick(i)}
            disabled={isCardDisabled(card, i)}
          />
        ))}
      </GameBoardContainer>
      <Canvas ref={canvasRef} />

      {victory && (
        <>
          <Divider />
          <FooterWrapper>
            <PlayAgainButton
              onClick={() => window.location.reload()}
              whileHover={{
                boxShadow: `0 0 20px #ffffff30`,
                scale: 1.05,
                transition: {
                  boxShadow: {
                    repeatType: 'mirror',
                    repeat: Infinity,
                    duration: 0.5,
                    ease: 'linear',
                  },
                },
              }}
              whileTap={{ scale: 0.95 }}
            >
              NEW GAME
            </PlayAgainButton>
          </FooterWrapper>
        </>
      )}
    </div>
  );
};

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
`;

const GameBoardContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4, 84px);
  gap: 8px;
  z-index: 1;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1;
`;

const Divider = styled.div`
  height: 30px;
  width: 100%;
`;

const PlayAgainButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.04);
  color: rgb(136, 136, 160);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 32px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 2px;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
  }
`;

export default GameBoard;
