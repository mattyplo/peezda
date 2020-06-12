import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayByPlay extends Component {


  constructor(props) {
    super(props);

    this.state = {
      playByPlay: ""
    }
  }

  componentDidUpdate(prevProps) {
    const { currentRollScore, dice, turn } = this.props;
    const prevCurrentRollScore = prevProps.currentRollScore;
    const prevDice = prevProps.dice;
    const prevTurn = prevProps.turn;
    if (turn !== prevTurn) {
      const playerTurn = turn;
      const lineText = "Player " + playerTurn + "'s turn -- ";
      this.setState({
        playByPlay: this.state.playByPlay + lineText
      })
    }

    if (dice !== prevDice) {
      const diceRoll = "Dice Roll: " + JSON.stringify(dice) + " --- "
      this.setState({
        playByPlay: this.state.playByPlay + diceRoll
      })
    }
  }

  render() {

    const { playByPlay } = this.state;

    return (
      <div id='playByPlay'>
        <h3>Play by Play</h3>
        <p>{ playByPlay }</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const { dice, turn, currentRollScore } = state.game;

  return {
    currentRollScore,
    dice,
    turn
  }
}

export default connect(mapStateToProps)(PlayByPlay);
