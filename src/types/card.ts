export interface CardSymbol {
  icon: string;
  background: string;
  glow: string;
}

export interface CardData {
  id: number;
  symbol: CardSymbol;
  matched: boolean;
}
