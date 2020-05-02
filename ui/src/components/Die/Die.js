import React, { Component } from 'react';
import './Die.css';

class Die extends Component {

  render() {

    const diceVal = this.props.value

    return (
      <div class='die'>
        <p>one die</p>
        <img
          src={require("../../assets/dice_" + diceVal + ".png")}
          alt={"Dice with value = " + diceVal}
        />
      </div>
    )
  }
}

export default Die;
