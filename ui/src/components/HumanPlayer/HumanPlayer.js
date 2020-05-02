import React, { Component } from 'react';

export class HumanPlayer extends Component {

  componentDidUpdate(prevProps) {
    const { enableRoll, isTurn } = this.props;
    // Enable another roll
    if (this.props.rollAgain === true && prevProps.rollAgain !== true) {
      enableRoll();
    }

    // If it's the users turn and previously it wasn't. enable their roll.
    if (isTurn && !prevProps.isTurn) {
      enableRoll();
    }
  }

  render() {

    const { rollEnabled, playerId, score, preRoll, roll, isTurn } = this.props

    return(
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>You</h3>
        <button onClick={isTurn ? roll : preRoll} disabled={rollEnabled ? false : true}>Role</button>
      </div>
    )
  }
}

export default HumanPlayer;
