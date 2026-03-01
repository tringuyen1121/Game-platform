import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import MatchGameScreen from './components/MatchGame/GameScreen';
import GameGrid from './components/GameGrid/GameGrid';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';

function App() {
  const localPath = window.location.pathname;

  console.log('Current path:', localPath);

  return (
    <>
      <Header />
      {localPath !== '/games/match-game' && (
        <>
          <GameGrid />
          <ParticleBackground />
        </>
      )}
      {localPath === '/games/match-game' && <MatchGameScreen />}
    </>
  );
}

export default App;
