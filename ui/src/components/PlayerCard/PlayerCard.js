import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ComputerPlayer from '../ComputerPlayer/ComputerPlayer.js';
import HumanPlayer from '../HumanPlayer/HumanPlayer.js';
import { preRoll, roll } from '../../redux/actions/gameActions';

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
    this.props.roll()
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
    const { playerId, score, isHuman, rollAgain, isTurn, dice } = this.props;
    if (isHuman) {
      return (
        <HumanPlayer
          rollEnabled={rollEnabled}
          playerId={playerId}
          score={score}
          enableRoll={this.enableRoll}
          roll={this.roll}
          preRoll={this.preRoll}
          rollAgain={rollAgain}
          isTurn={isTurn}
        />
      )
    } else {
      return (
        <ComputerPlayer
          dice={dice}
          rollEnabled={rollEnabled}
          playerId={playerId}
          score={score}
          enableRoll={this.enableRoll}
          roll={this.roll}
          preRoll={this.preRoll}
          rollAgain={rollAgain}
          isTurn={isTurn}
        />
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    preRoll: (playerId) => dispatch(preRoll(playerId)),
    roll: () => dispatch(roll())
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rollAgain: state.game.players[ownProps.playerId].rollAgain,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PlayerCard);
