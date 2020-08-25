import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ComputerPlayer from '../ComputerPlayer/ComputerPlayer.js';
import HumanPlayer from '../HumanPlayer/HumanPlayer.js';
import { preRoll, roll, disallowPlayerToRoll, enablePlayerToRoll, updateCurrentRollScore } from '../../redux/actions/gameActions';
import { isScoringDiceHeld, playerCanEndTurn } from '../../utility/rules.js';

export class PlayerCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rollEnabled: true,
      currentRoll: null
    }

    // Bind methods
    this.enableRoll = this.enableRoll.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.roll = this.roll.bind(this);
    this.preRoll = this.preRoll.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isTurn && prevProps.dice !== this.props.dice) {
      // checkIfPlayerCanRoll
      const playerCanRoll = isScoringDiceHeld(this.props.dice);
      // update rollIsEnabled of player whose turn it is.
      if (playerCanRoll) {
        this.props.enablePlayerToRoll(this.props.playerId)
      } else {
        this.props.disallowPlayerToRoll(this.props.playerId)
      }
    }

    // The turn changed to this players turn, they need to roll.
    if (this.props.isTurn && !prevProps.isTurn) {
      this.props.enablePlayerToRoll(this.props.playerId);
    }
  }

  enableRoll = () => {
    this.setState({
      rollEnabled: true
    })
  }

  endTurn = () => {
    console.log('end turn');
  }

  roll = () => {
    // updateCurrentRollScore
    const { dice } = this.props;
    this.props.updateCurrentRollScore(dice)
    this.props.roll(dice);
    this.props.disallowPlayerToRoll(this.props.playerId);
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
    const { playerId,
            score,
            isHuman,
            preGameRollOff,
            isTurn,
            dice,
            currentRollScore,
            rollIsEnabled } = this.props;
    var canEndTurn = isTurn && playerCanEndTurn(dice, score, currentRollScore) ? true : false;

    if (isHuman) {
      return (
        <HumanPlayer
          canEndTurn={canEndTurn}
          rollIsEnabled={rollIsEnabled}
          playerId={playerId}
          score={score}
          roll={this.roll}
          preRoll={this.preRoll}
          isTurn={isTurn}
          endTurn={this.endTurn}
        />
      )
    } else {
      return (
        <ComputerPlayer
          canEndTurn={canEndTurn}
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
    enablePlayerToRoll: (playerId) => dispatch(enablePlayerToRoll(playerId)),
    disallowPlayerToRoll: (playerID) => dispatch(disallowPlayerToRoll(playerID)),
    preRoll: (playerID) => dispatch(preRoll(playerID)),
    roll: (dice) => dispatch(roll(dice)),
    updateCurrentRollScore: (dice) => dispatch(updateCurrentRollScore(dice))
  }
}

const mapStateToProps = (state) => {
  return {
    canEndTurn: state.game.canEndTurn,
    currentRollScore: state.game.currentRollScore
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(PlayerCard);
