import React, { Component } from 'react';
import { selectDiceToHold } from '../../utility/computerStrategy';

export class ComputerPlayer extends Component {

  componentDidMount() {
    const { turn, preRoll } = this.props;
    // if not anyones turn, then we are in pregame roll to determine order.
    if (!turn) {
      preRoll();
    }
  }

  componentDidUpdate(prevProps) {

    const { isTurn, preRoll, roll, dice } = this.props;

    // Enable another roll
    if (this.props.rollAgain === true && prevProps.rollAgain !== true) {
      preRoll();
    }

    // It is now the players turn
    if (isTurn && !prevProps.isTurn) {
      roll();
    }

    // if the computer roled the dice, evaluate their next move
    if (isTurn && prevProps.isTurn && dice !== prevProps.dice) {
      // evaluate which dice to hold
      this.determineMove();
    }
  }

  determineMove = () => {
    const { dice } = this.props;
    const diceToHold = selectDiceToHold(dice);
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
