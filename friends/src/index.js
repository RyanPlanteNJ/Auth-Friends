import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
     <Router>
        <div className="App">
          <ul>
            <li>
              <Link to = "/login">Login</Link>
              <Link to ="/protected">Friend's List</Link>
            </li>
          </ul>
          <Switch>
            <PrivateRoute exact path ="/protected" component={FriendsList} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

