import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerCard from '../PlayerCard/PlayerCard.js'

class Game extends Component {

  render() {

    const { players } = this.props
    console.log(players)
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
    players: state.game.players
  }
}

export default connect(mapStateToProps)(Game);
