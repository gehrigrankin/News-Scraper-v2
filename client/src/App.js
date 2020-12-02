import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Alert from "./components/Alert";
import PrivateRoute from "./components/routing/PrivateRoute"

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.scss';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <Alert /> */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/saved" component={Saved} />
            {/* 
          <Route component={NoMatch} /> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App;
