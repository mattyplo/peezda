import React, { Component } from 'react';
import PlayerCard from '../PlayerCard/PlayerCard.js';
import './Seats.css';

class Seats extends Component {

  render() {

    const { players, turn, dice } = this.props;

    return (
      <div id="seats" >
      {Object.keys(players).map((id, i) => {
        var isTurn = (turn === id) ? true : false;
        return (
          <PlayerCard
            dice={dice}
            key={id}
            playerId={id}
            score={players[id].score}
            isHuman={players[id].isHuman}
            isTurn={isTurn}
            preGameRollOff={players[id].preGameRollOff}
            rollIsEnabled={players[id].rollIsEnabled}
            turnOverToNextPlayer={this.props.turnOverToNextPlayer}
          />
        )}
      )}
      </div>
    )
  }
}

export default Seats;
