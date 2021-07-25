import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './pages/Posts';
import TextareaWithButton from './components/TextareaWithButton';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/posts" >
            <Posts/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
