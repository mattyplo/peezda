import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ComputerPlayer from '../ComputerPlayer/ComputerPlayer.js';
import HumanPlayer from '../HumanPlayer/HumanPlayer.js';
import { preRoll, roll, disallowPlayerToRoll } from '../../redux/actions/gameActions';

export class PlayerCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rollEnabled: true,
      currentRoll: null
    }

    // Bind methods
    this.enableRoll = this.enableRoll.bind(this);
    this.roll = this.roll.bind(this);
    this.preRoll = this.preRoll.bind(this);
  }

  enableRoll = () => {
    this.setState({
      rollEnabled: true
    })
  }

  roll = () => {
    this.props.roll();
    this.props.disallowPlayerToRoll();
  }

  preRoll = () => {
    const { playerId } = this.props
    this.props.preRoll(playerId)
    this.setState({
      rollEnabled: false
    })
  }

  render() {

    const { rollEnabled } = this.state;
    const { playerId, score, isHuman, preGameRollOff, isTurn, dice, currentRollScore, rollIsEnabled } = this.props;
    if (isHuman) {
      return (
        <HumanPlayer
          rollEnabled={rollEnabled}
          rollIsEnabled={rollIsEnabled}
          playerId={playerId}
          score={score}
          enableRoll={this.enableRoll}
          roll={this.roll}
          preRoll={this.preRoll}
          preGameRollOff={preGameRollOff}
          isTurn={isTurn}
        />
      )
    } else {
      return (
        <ComputerPlayer
          currentRollScore={currentRollScore}
          dice={dice}
          rollEnabled={rollEnabled}
          rollIsEnabled={rollIsEnabled}
          playerId={playerId}
          score={score}
          enableRoll={this.enableRoll}
          roll={this.roll}
          preRoll={this.preRoll}
          preGameRollOff={preGameRollOff}
          isTurn={isTurn}
        />
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    disallowPlayerToRoll: (playerID) => dispatch(disallowPlayerToRoll(playerID)),
    preRoll: (playerID) => dispatch(preRoll(playerID)),
    roll: () => dispatch(roll())
  }
}

const mapStateToProps = (state) => {
  return {
    currentRollScore: state.game.currentRollScore
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PlayerCard);
