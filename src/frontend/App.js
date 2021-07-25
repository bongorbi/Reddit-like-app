import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import PostWithComments from './components/PostWithComments';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/:id" children={<Home />}>
            <PostWithComments/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
