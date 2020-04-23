import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard.js'

class Game extends Component {

  constructor(props) {
    super(props);

    this.allPlayersRolled = this.allPlayersRolled.bind(this);
    this.determineOrder = this.determineOrder.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { turn, players } = this.props;
    // if turn is null, we need to determine who rolls first
    if (turn === null && prevProps.players !== players) {
      // check if all players have rolled.
        if (this.allPlayersRolled()) {
        // determine results from initial roll
        this.determineOrder();
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

  determineOrder = () => {
    const { players } = this.props;
    var highRoll = 0;
    var playersWithHighRoll = [];
    for (var playerId in players) {
      // if the player has the highest roll, they are now the sole player on the list.
      if (players[playerId].roll > highRoll) {
        playersWithHighRoll = [];
        playersWithHighRoll.push(playerId);
        highRoll = players[playerId].roll;
      } else if (players[playerId].roll === highRoll) {
        // The player shares a high roll with at least another player.
        playersWithHighRoll.push(playerId);
      }
    }
    console.log(playersWithHighRoll)
  }

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

const mapStateToProps = (state) => {
  return {
    players: state.game.players,
    turn: state.game.turn
  }
}

export default connect(mapStateToProps)(Game);
