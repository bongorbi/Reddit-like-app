import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/posts">
            <Posts/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
