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

  roll = () => {
    this.props.rollDice()
    this.setState({
      rollEnabled: false
    })
  }

  render() {

    const { rollEnabled, currentRoll } = this.state;
    const { playerId, score, isHuman } = this.props;
    let rollButton, roll;
    if (isHuman) {
      rollButton = <button onClick={this.roll} disabled={rollEnabled ? false : true}>Role</button>
    }
    if (currentRoll) {
      roll = <h3>Roll = {currentRoll}</h3>
    }

    return (
      <div>
        <h3>Player{playerId}</h3>
        <h3>score = {score}</h3>
        <h3>{isHuman ? 'You' : 'Computer' }</h3>
        {roll}
        {rollButton}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rollDice: () => dispatch(rollDice())
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(PlayerCard);
