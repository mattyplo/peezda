import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Die from '../Die/Die.js';
import './Table.css';
import { changeTurn } from '../../redux/actions/gameActions.js';
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
  }

  turnOverToNextPlayer = () => {
    const { changeTurn, turn, players } = this.props;
    const numPlayers = Object.keys(players).length;
    const nextPlayersTurn = calculateNextPlayersTurn(turn, numPlayers);
    changeTurn(nextPlayersTurn);
  }

  toggleHoldDie = (diceId) => {
    console.log(this.state)
    this.setState(prevState => ({
      ...prevState,
      diceMarkedToHold: {
        ...prevState.diceMarkedToHold,
        [diceId]: !prevState.diceMarkedToHold[diceId]
      }
    }))
  }

  render() {

    const { dice, advanceTurnEnabled } = this.props;
    const { diceMarkedToHold } = this.state;

    return (
      <div id='table' >
        <button onClick={this.turnOverToNextPlayer} disabled={advanceTurnEnabled ? false : true} > Advance Turn </button>
        <p> table </p>
        {Object.keys(dice).map((die) =>
          <Die
            value={dice[die].value}
            holdDie={this.toggleHoldDie}
            key={die}
            diceId={die}
            markedHeld={dice[die].isHeld ? true : diceMarkedToHold[die]}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTurn: (nextPlayersTurn) => dispatch(changeTurn(nextPlayersTurn))
  }
}

export default compose(connect(null, mapDispatchToProps))(Table);
