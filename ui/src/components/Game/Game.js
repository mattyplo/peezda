import React, { Component } from 'react';
import { connect } from 'react-redux';
import { canEndTurn, changeTurn, determineOrder, markCheckedForPeezda, markFirstToFinish, unmarkDiceHeld } from '../../redux/actions/gameActions';
import { calculateNextPlayersTurn, getDiceMarkedToHold, getScoreOfDice, isPeezda } from '../../utility/rules.js';
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
            firstToFinish,
            turn,
            players,
            determineOrder,
            dice,
            currentRollScore,
            canEndTurn } = this.props;

    // Check if the game is over.
    if (firstToFinish === turn) {
      // game over
      console.log("game over.  Player " + turn + " wins!");
      // determine winner

      // end game, display winner, collect $200
    }

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
    const { changeTurn, currentRollScore, dice, firstToFinish, unmarkDiceHeld, turn, players } = this.props;
    const numPlayers = Object.keys(players).length;
    const nextPlayersTurn = calculateNextPlayersTurn(turn, numPlayers);
    // check if player hit the 10000 point mark
    const playersExistingScore = players[turn].score;
    const diceMarkedToHold = getDiceMarkedToHold(dice);
    const scoreOfDiceMarkedToHold = getScoreOfDice(diceMarkedToHold);
    const currentScore = playersExistingScore + scoreOfDiceMarkedToHold + currentRollScore;
    if (firstToFinish === -1 && currentScore >= 1000) {
      this.props.markFirstToFinish(turn);
    }
    // clear dice & advance to next persons turn
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
    markFirstToFinish: (playerId) => dispatch(markFirstToFinish(playerId)),
    unmarkDiceHeld: (dice) => dispatch(unmarkDiceHeld(dice))
  }
}

const mapStateToProps = (state) => {

  const { checkedForPeezda, currentRollScore, firstToFinish, isTurnsInitialRoll, players, turn, dice } = state.game;

  return {
    checkedForPeezda,
    currentRollScore,
    firstToFinish,
    isTurnsInitialRoll,
    players,
    turn,
    dice
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
