import React, { Component } from 'react';

class PlayerCard extends Component {

  render() {

    const { playerId, score, isHuman } = this.props
    
    return (
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>{isHuman ? 'You' : 'Computer' }</h3>
      </div>
    )
  }
}

export default PlayerCard;
