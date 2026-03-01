import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import MatchGameScreen from './components/MatchGame/GameScreen';

function App() {
  return (
    <>
      <Header />
      <MatchGameScreen />
    </>
  );
}

export default App;
