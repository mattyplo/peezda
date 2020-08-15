import React, { Component } from 'react';

export class HumanPlayer extends Component {

  componentDidUpdate(prevProps) {
    const { enableRoll, isTurn, rollIsEnabled } = this.props;
    // Enable another roll
    if (this.props.preGameRollOff === true && prevProps.preGameRollOff !== true) {
      enableRoll();
    }

    // If it's the users turn and previously it wasn't. enable their roll.
    // if (isTurn && !prevProps.isTurn) {
    //   enableRoll();
    // }

    // if the users state rollIsEnabled, then enableRoll();

  }

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
