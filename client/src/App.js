import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* 
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  </Provider>
)

export default App;
