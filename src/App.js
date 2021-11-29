
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import InitialPageProvider from './context/InitialPageProvider';
import InitialPage from './pages/InitalPage';
import QuestionPage from './pages/QuestionPage';
import Report from './pages/Report';

function App() {
  return (
    <BrowserRouter>
      <InitialPageProvider>
        <Switch>
          <Route exact path="/" component={ InitialPage } />
          <Route path="/questions" component={ QuestionPage } />
          <Route path="/report" component={ Report } /> 
        </Switch>
      </InitialPageProvider>
    </BrowserRouter>
  );
}

export default App;
