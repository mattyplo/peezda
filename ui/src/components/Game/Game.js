import React, { Component } from 'react';
import { connect } from 'react-redux';
import { canEndTurn, changeTurn, determineOrder, markCheckedForPeezda, unmarkDiceHeld } from '../../redux/actions/gameActions';
import { calculateNextPlayersTurn, isPeezda } from '../../utility/rules.js';
import Seats from '../Seats/Seats.js';
import Table from '../Table/Table.js';
import './Game.css'

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      advanceTurnEnabled: false
    }

    this.turnOverToNextPlayer = this.turnOverToNextPlayer.bind(this);
    this.allPlayersRolled = this.allPlayersRolled.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { checkedForPeezda,
            turn,
            players,
            determineOrder,
            dice,
            currentRollScore,
            canEndTurn } = this.props;
    // if turn is null, we need to determine who rolls first
    if (turn === null && prevProps.players !== players) {
      // check if all players have rolled.
        if (this.allPlayersRolled()) {
        // determine results from initial roll
        determineOrder(players);
      }
    }

    // Check for Peezda after each diceRoll.
    if (turn && !checkedForPeezda) {
      this.props.markCheckedForPeezda();
      const peezda = isPeezda(dice);
      // if peezda, enable AdvanceTurn
      // console.log("peezda = " + peezda);
      if (peezda) {
        // turn is over, end turn.
        console.log('peezda')
        this.turnOverToNextPlayer()
        // this.setState({
        //   advanceTurnEnabled: true
        // })
      } else {
        canEndTurn(players[turn], dice, currentRollScore);
      }
      // if not peezda, allow user to pick dice to hold.
    }
  }

  turnOverToNextPlayer = () => {
    const { changeTurn, dice, unmarkDiceHeld, turn, players } = this.props;
    const numPlayers = Object.keys(players).length;
    const nextPlayersTurn = calculateNextPlayersTurn(turn, numPlayers);
    unmarkDiceHeld(dice);
    changeTurn(nextPlayersTurn);
  }

  allPlayersRolled = () => {
    const { players } = this.props;
    // if any player has a null roll return false
    for (var playerId in players) {
      if (players[playerId].roll === null) {
        return false;
      }
    }
    // each player has a roll value, return true
    return true;
  }

  render() {


    const { isTurnsInitialRoll, players, turn, dice } = this.props;
    const { advanceTurnEnabled } = this.state;

    return (
      <div id='game'>
        <h1>Game!</h1>
        <Seats
          players={ players }
          turn={ turn }
          dice = { dice }
          turnOverToNextPlayer = { this.turnOverToNextPlayer }
        />
        <Table
          dice = { dice }
          isTurnsInitialRoll = { isTurnsInitialRoll }
          players = { players }
          turn={ turn }
          advanceTurnEnabled={ advanceTurnEnabled }
          holdDie={ this.holdDie }
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    canEndTurn: (player, dice, currentRollScore) => dispatch(canEndTurn(player, dice, currentRollScore)),
    changeTurn: (playerId) => dispatch(changeTurn(playerId)),
    determineOrder: (players) => dispatch(determineOrder(players)),
    markCheckedForPeezda: () => dispatch(markCheckedForPeezda()),
    unmarkDiceHeld: (dice) => dispatch(unmarkDiceHeld(dice))
  }
}

const mapStateToProps = (state) => {

  const { checkedForPeezda, currentRollScore, isTurnsInitialRoll, players, turn, dice } = state.game;

  return {
    checkedForPeezda,
    currentRollScore,
    isTurnsInitialRoll,
    players,
    turn,
    dice
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
