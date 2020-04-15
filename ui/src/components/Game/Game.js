import React, { Component } from 'react';
import PlayerCard from '../PlayerCard/PlayerCard.js'

class Game extends Component {

  render() {
    return (
      <div>
        <h1>Game!</h1>
        <PlayerCard/>
      </div>
    )
  }
}

export default Game;
