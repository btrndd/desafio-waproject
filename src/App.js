import './App.css';
import InitialPageProvider from './context/InitialPageProvider';
import InitialPage from './pages/InitalPage';

function App() {
  return (
    <div className="App">
    <InitialPageProvider>
      <InitialPage />
    </InitialPageProvider>
    </div>
  );
}

export default App;
