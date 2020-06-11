import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectDiceToHold } from '../../utility/computerStrategy';
import { getScoreOfDice } from '../../utility/rules.js';
import { holdDice,
         rollAgain,
         scoreCurrentDice,
         enablePlayerToRoll,
         disallowPlayerToRoll } from '../../redux/actions/gameActions.js';

export class ComputerPlayer extends Component {

  componentDidMount() {
    const { preRoll, preGameRollOff } = this.props;
    // if not anyones turn, then we are in pregame roll to determine order.
    if (preGameRollOff) {
      //console.log(preGameRollOff)
      preRoll();
    }
  }

  componentDidUpdate(prevProps) {
    const { isTurn, preRoll, roll, dice, canEndTurn, rollIsEnabled } = this.props;

    // Enable another roll
    //console.log(this.props.playerId + ' - preGameRollOff: ' + this.props.preGameRollOff  + ' prevProps.preGameRollOff: ' + prevProps.preGameRollOff);
    if (this.props.preGameRollOff === true && prevProps.preGameRollOff !== true) {
      //console.log(this.props.preGameRollOff)
      preRoll();
    }

    // It is now the players turn
    if (isTurn && !prevProps.isTurn) {
      console.log("player: " + this.props.playerID + " -> Initial Roll")
      roll();
      // If the computer chose to keep rolling and their roll is enabled
    } else if (!canEndTurn && rollIsEnabled) {
      this.props.rollAgain(dice);
      this.props.disallowPlayerToRoll(this.props.playerId);
    }

    // if the computer roled the dice, evaluate their next move
    if (isTurn && prevProps.isTurn && dice !== prevProps.dice) {
      // evaluate which dice to hold
      this.determineMove();
    }
  }

  determineMove = () => {
    setTimeout(() => {}, 1000);
    const { dice, score, currentRollScore, holdDice, playerId, scoreCurrentDice, enablePlayerToRoll } = this.props;
    const diceToHold = selectDiceToHold(dice);
    const scoreOfCurrentDice = getScoreOfDice(diceToHold);
    // if min score is not met, holdDiceAndRollAgain
    // score == 0, min score >= 500, else min score >= 350
    if ((score === 0 && scoreOfCurrentDice + currentRollScore < 500)
    || (score > 0 && scoreOfCurrentDice + currentRollScore < 350)) {
      holdDice(diceToHold, dice);
      scoreCurrentDice(scoreOfCurrentDice);
      enablePlayerToRoll(playerId);
    } else { // if min score is met, holdDiceAndEndTurn
      console.log('end turn');
      scoreCurrentDice(scoreOfCurrentDice);
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
    disallowPlayerToRoll: (playerID) => dispatch(disallowPlayerToRoll(playerID)),
    enablePlayerToRoll: (playerID) => dispatch(enablePlayerToRoll(playerID)),
    holdDice: (diceToHold, dice) => dispatch(holdDice(diceToHold, dice)),
    rollAgain: (dice) => dispatch(rollAgain(dice)),
    scoreCurrentDice: (score) => dispatch(scoreCurrentDice(score)),
  }
}

export default connect(null, mapDispatchToProps)(ComputerPlayer);
