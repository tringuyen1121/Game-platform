import styled from 'styled-components';
import GameCard from '../GameCard/GameCard';

const games = [
  {
    title: 'Space Quest',
    description: 'Epic space adventure',
    color: '#00d4ff',
  },
  {
    title: 'Puzzle Master',
    description: 'Brain-teasing challenges',
    color: '#7b2ff7',
  },
  {
    title: 'Racing Legends',
    description: 'High-speed action',
    color: '#ff006e',
  },
];

const GameGrid = () => {
  return (
    <Section>
      <SectionTitle>Featured Games</SectionTitle>
      <Grid>
        {games.map((game, index) => (
          <GameCard key={game.title} {...game} index={index} />
        ))}
      </Grid>
    </Section>
  );
};

const Section = styled.section`
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export default GameGrid;
