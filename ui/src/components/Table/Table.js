import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Die from '../Die/Die.js';
import PlayByPlay from '../PlayByPlay/PlayByPlay.js';
import './Table.css';
import { changeTurn, toggleToHold } from '../../redux/actions/gameActions.js';
import { calculateNextPlayersTurn } from '../../utility/rules.js';

class Table extends Component {

  constructor(props) {
    super(props)

    this.state = {
      diceMarkedToHold: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false
      }
    }

    this.checkDieCanBeHeld = this.checkDieCanBeHeld.bind(this);
  }

  turnOverToNextPlayer = () => {
    const { changeTurn, turn, players } = this.props;
    const numPlayers = Object.keys(players).length;
    const nextPlayersTurn = calculateNextPlayersTurn(turn, numPlayers);
    changeTurn(nextPlayersTurn);
  }

  toggleHoldDie = (diceId) => {
    const canBeHeld = this.checkDieCanBeHeld(diceId);
    // if die can't be held, don't toggle.
    if (!canBeHeld || this.props.isTurnsInitialRoll) {
      return;
    }

    this.props.toggleToHold(diceId);
  }

  checkDieCanBeHeld = (diceId) => {
    // if it's a new persons turn, the dice can't be held!


    const { dice } = this.props;
    const currentDieValue = dice[diceId].value;
    // calculate numOfAKind
    var numOfAKind = [0, 0, 0, 0, 0, 0];
    for (var die in dice ) {
      // if dice is not already held
      if(!dice[die].isHeld) {
          numOfAKind[dice[die].value - 1] ++
      }
    }
    // if die is a one or a five, or has a three of a kind
    if (currentDieValue === 1 || currentDieValue === 5 || numOfAKind[currentDieValue - 1] > 2) {
      return true;
    }

    // dice can't be held
    return false;
  }

  render() {

    const { dice, advanceTurnEnabled } = this.props;

    return (
      <div id='table' >
        <button onClick={this.turnOverToNextPlayer} disabled={advanceTurnEnabled ? false : true} > Advance Turn </button>
        <p> table </p>
        <div id='dice' >
          {Object.keys(dice).map((die) =>
            <Die
              value={dice[die].value}
              holdDie={this.toggleHoldDie}
              key={die}
              diceId={die}
              markedHeld={dice[die].isHeld ? true : false }
              markedToHold={dice[die].markedToHold ? true : false }
            />
          )}
        </div>
        <PlayByPlay />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleToHold: (diceId) => dispatch(toggleToHold(diceId)),
    changeTurn: (nextPlayersTurn) => dispatch(changeTurn(nextPlayersTurn))
  }
}

export default compose(connect(null, mapDispatchToProps))(Table);
