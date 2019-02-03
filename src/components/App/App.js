import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Projects from '../Projects/projects';
import Admin from '../Admin/admin';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header className='App-header'>
          <img src='https://i.ebayimg.com/images/g/22YAAOSwT4ZbCfHb/s-l300.jpg' width='100px' alt='lipsum'/>
          <h1>Matt Kleven</h1>
        </header>
        <Router>
          <div>
            <Route exact path="/" component={Projects} />
            <Route exact path="/admin" component={Admin} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
