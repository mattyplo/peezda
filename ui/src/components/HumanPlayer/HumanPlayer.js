import React, { Component } from 'react';

export class HumanPlayer extends Component {
  render() {

    const { playerId, score, preRoll, roll, isTurn, rollIsEnabled } = this.props

    return(
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>You</h3>
        <button onClick={isTurn ? roll : preRoll} disabled={rollIsEnabled ? false : true}>Role</button>
      </div>
    )
  }
}

export default HumanPlayer;
