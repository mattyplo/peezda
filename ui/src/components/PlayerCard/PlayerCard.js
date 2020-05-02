import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { rollDice } from '../../redux/actions/gameActions';

export class PlayerCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rollEnabled: true,
      currentRoll: null
    }

    // Bind methods
    this.roll = this.roll.bind(this);
  }

  componentDidMount() {
    const { isHuman, turn } = this.props;
    // If the 'player' is the computer, roll the dice for them.
    if (!isHuman && !turn) {
      this.roll();
    }
  }

  componentDidUpdate(prevProps) {
    // Enable another roll
    if (this.props.rollAgain === true && prevProps.rollAgain !== true) {
      this.setState({
        rollEnabled: true
      })
      // If it's a computer player, roll for them
      if (!this.props.isHuman) {
        this.roll();
      }
    }
  }

  roll = () => {
    const { playerId } = this.props
    this.props.rollDice(playerId)
    this.setState({
      rollEnabled: false
    })
  }

  render() {

    const { rollEnabled } = this.state;
    const { playerId, score, isHuman } = this.props;
    let rollButton;
    if (isHuman) {
      rollButton = <button onClick={this.roll} disabled={rollEnabled ? false : true}>Role</button>
    }

    return (
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>{isHuman ? 'You' : 'Computer' }</h3>
        {rollButton}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rollDice: (playerId) => dispatch(rollDice(playerId))
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
