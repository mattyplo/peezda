import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectDiceToHold } from '../../utility/computerStrategy';
import { getScoreOfDice } from '../../utility/rules.js';
import { holdDice, scoreCurrentDice, enableRollAgain } from '../../redux/actions/gameActions.js';

export class ComputerPlayer extends Component {

  componentDidMount() {
    const { turn, preRoll } = this.props;
    // if not anyones turn, then we are in pregame roll to determine order.
    if (!turn) {
      preRoll();
    }
  }

  componentDidUpdate(prevProps) {
    const { isTurn, preRoll, roll, dice, currentRollScore } = this.props;

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
    const { dice, score, currentRollScore, holdDice, playerId } = this.props;
    const diceToHold = selectDiceToHold(dice);
    const scoreOfCurrentDice = getScoreOfDice(diceToHold);
    // if min score is not met, holdDiceAndRollAgain
    // score == 0, min score >= 500, else min score >= 350
    if ((score === 0 && scoreOfCurrentDice + currentRollScore < 500)
    || (score > 0 && scoreOfCurrentDice + currentRollScore < 350)) {
      holdDice(diceToHold, dice);
      scoreCurrentDice(scoreOfCurrentDice);
      enableRollAgain(playerId);
    } else { // if min score is met, holdDiceAndEndTurn
      console.log(diceToHold);
      // endTurn()   -> NEED TO WRITE THIS FUNCTION
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

const mapDispatchToProps = dispatch => {
  return {
    enableRollAgain: (playerID) => dispatch(enableRollAgain(playerID)),
    holdDice: (diceToHold, dice) => dispatch(holdDice(diceToHold, dice)),
    scoreCurrentDice: (score) => dispatch(scoreCurrentDice(score))
  }
}

export default connect(null, mapDispatchToProps)(ComputerPlayer);
