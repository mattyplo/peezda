import React, { Component } from 'react';

export class ComputerPlayer extends Component {

  componentDidMount() {
    const { turn, preRoll } = this.props;
    // if not anyones turn, then we are in pregame roll to determine order.
    if (!turn) {
      preRoll();
    }
  }

  componentDidUpdate(prevProps) {

    const { isTurn, preRoll, roll } = this.props;
    // Enable another roll
    if (this.props.rollAgain === true && prevProps.rollAgain !== true) {
      preRoll();
    }

    // It is now the players turn
    if (isTurn && !prevProps.isTurn) {
      roll();
    }
  }

  render() {

    const { playerId, score } = this.props;

    return (
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>Computer</h3>
      </div>
    )
  }
}

export default ComputerPlayer;
