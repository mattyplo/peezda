import React, { Component } from 'react';
import './newGame.css'

class NewGame extends Component {
  render() {
    return(
      <div>
        <div className='GameHeader'>
          <h2> Start New Game </h2>
        </div>
        <div className="GameHeader">
          <h2> Join New Game </h2>
        </div>
      </div>
    )
  }
}

export default NewGame;
