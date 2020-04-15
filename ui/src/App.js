import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './components/home.js';
import Game from './components/Game/Game.js';
import Header from './components/header.js';
import Footer from './components/footer.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/match" component={Game} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
