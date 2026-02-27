import Header from './components/Header/Header';
import LoadingSpinner from './components/Spinner/LoadingSpinner';

function App() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>CSS Animations Working!</h2>
        <LoadingSpinner />
      </main>
    </div>
  );
}

export default App;
