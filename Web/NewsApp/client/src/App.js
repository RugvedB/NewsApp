import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
// import CreatePost from './components/CreatePost'
import Headlines from './components/Headlines';
import Selection from './components/Selection'
import Sources from './components/Sources'

require('dotenv').config()

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/createPost" component={CreatePost} /> */}
            <Route exact path="/Headlines" component={Headlines} />
            <Route exact path="/Selection" component={Selection} />
            <Route exact path="/Sources" component={Sources} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App

