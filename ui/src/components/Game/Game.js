import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTurn, initialRollFaceOff, determineOrder } from '../../redux/actions/gameActions';
import { isPeezda } from '../../utility/rules.js';
import Seats from '../Seats/Seats.js';
import Table from '../Table/Table.js';
import './Game.css'

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      advanceTurnEnabled: false
    }

    this.allPlayersRolled = this.allPlayersRolled.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { turn, players, determineOrder, dice } = this.props;
    // if turn is null, we need to determine who rolls first
    if (turn === null && prevProps.players !== players) {
      // check if all players have rolled.
        if (this.allPlayersRolled()) {
        // determine results from initial roll
        determineOrder(players);
      }
    }

    // Check for Peezda after each diceRoll.
    if (dice !== prevProps.dice) {
      const peezda = isPeezda(dice);
      // if peezda, enable AdvanceTurn
      if (peezda) {
        this.setState({
          advanceTurnEnabled: true
        })
      }
      // if not peezda, allow user to pick dice to hold.
    }
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

    const { players, turn, dice } = this.props;
    const { advanceTurnEnabled } = this.state;

    return (
      <div id='game'>
        <h1>Game!</h1>
        <Seats
          players={ players }
          turn={ turn }
          dice = { dice }
        />
        <Table
          dice = { dice }
          players = { players }
          turn={ turn }
          advanceTurnEnabled={ advanceTurnEnabled }
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTurn: (playerId) => dispatch(changeTurn(playerId)),
    initialRollFaceOff: (playerIds) => dispatch(initialRollFaceOff(playerIds)),
    determineOrder: (players) => dispatch(determineOrder(players))
  }
}

const mapStateToProps = (state) => {

  const { players, turn, dice } = state.game

  return {
    players,
    turn,
    dice
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
