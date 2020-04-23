import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTurn, initialRollFaceOff, determineOrder } from '../../redux/actions/gameActions';
import PlayerCard from '../PlayerCard/PlayerCard.js';

class Game extends Component {

  constructor(props) {
    super(props);

    this.allPlayersRolled = this.allPlayersRolled.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { turn, players, determineOrder } = this.props;
    // if turn is null, we need to determine who rolls first
    if (turn === null && prevProps.players !== players) {
      // check if all players have rolled.
        if (this.allPlayersRolled()) {
        // determine results from initial roll
        determineOrder(players);
      }
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

  // determineOrder = () => {
  //   const { players, changeTurn } = this.props;
  //   var highRoll = 0;
  //   var playersWithHighRoll = [];
  //   for (var playerId in players) {
  //     // if the player has the highest roll, they are now the sole player on the list.
  //     if (players[playerId].roll > highRoll) {
  //       playersWithHighRoll = [];
  //       playersWithHighRoll.push(playerId);
  //       highRoll = players[playerId].roll;
  //     } else if (players[playerId].roll === highRoll) {
  //       // The player shares a high roll with at least another player.
  //       playersWithHighRoll.push(playerId);
  //     }
  //   }
  //   console.log(playersWithHighRoll)
  //   // if more then one player share the high roll, they roll again.
  //
  //   // if only one player has the high roll, they go first.
  //   if (playersWithHighRoll.length === 1) {
  //     const playerIdWithHighRoll = playersWithHighRoll[0];
  //     changeTurn(playerIdWithHighRoll);
  //   }
  // }

  render() {

    const { players } = this.props;
    return (
      <div>
        <h1>Game!</h1>
        {Object.keys(players).map((id, i) =>
          <PlayerCard
            key={id}
            playerId={id}
            score={players[id].score}
            isHuman={players[id].isHuman}
          />
        )}
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
  return {
    players: state.game.players,
    turn: state.game.turn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
