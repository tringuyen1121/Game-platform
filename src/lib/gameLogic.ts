import type { CardData } from '../types/card';
import SYMBOLS from './symbols';

const TOTAL_PAIRS = 8;

export const generateShuffledDeck = (): CardData[] => {
  const pairs = SYMBOLS.slice(0, TOTAL_PAIRS);

  const deck = [...pairs, ...pairs].map((symbol, index) => ({
    id: index,
    symbol,
    matched: false,
  }));

  // Shuffle the deck using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};
