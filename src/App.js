import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Following from './components/Following';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import Newfeed from './components/Newfeed';
class App extends Component {
  render() {
    return (
      <Router>
    <div className="App">
        <Route path="/" exact component={Newfeed} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
        <Route path="/following" component={Following} />
        <Route path="/editprofile" component={EditProfile} />        
    </div>
  </Router>
    );
  }
}

export default App;
