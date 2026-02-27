import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PageTransition from './components/PageTransition/PageTransition';
import LoadingSpinner from './components/Spinner/LoadingSpinner';
import GameGrid from './components/GameGrid/GameGrid';

function App() {
  const [currentPage, setCurrentPage] = useState('games');

  useEffect(() => {
    const hash = window.location.hash.slice(1) || 'games';
    setCurrentPage(hash);

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'games';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <PageTransition key={currentPage}>
        <main>
          {currentPage === 'games' && <GameGrid />}
          {currentPage === 'featured' && (
            <h2 style={{ padding: '4rem 2rem' }}>Featured Section</h2>
          )}
        </main>
      </PageTransition>
    </div>
  );
}

export default App;
