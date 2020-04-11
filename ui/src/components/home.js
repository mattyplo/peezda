import React, { Component } from 'react';
import './home.css'
import NewGameForm from './newGameForm/newGameForm.js';

class Home extends Component {
  render() {
    return(
      <div>
        <div className="MainBody">
          <NewGameForm/>
        </div>
      </div>
    )
  }
}

export default Home;
