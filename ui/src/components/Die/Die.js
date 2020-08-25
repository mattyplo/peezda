import React, { Component } from 'react';
import './Die.css';

class Die extends Component {

  constructor(props) {
    super(props);

    this.toggleHold = this.toggleHold.bind(this);
  }

  toggleHold = () => {
    const { diceId, holdDie } = this.props;
    holdDie(diceId);
  }

  render() {

    const diceVal = this.props.value;
    const { markedHeld, markedToHold } = this.props;
    var dieHeldStyle;

    if (markedHeld){
      dieHeldStyle = { opacity: '33%' };
    } else if (markedToHold) {
      dieHeldStyle = { opacity: '66%' };
    } else {
      dieHeldStyle = { opacity: '100%' };
    }

    // const dieHeldStyle = (markedHeld) ? { opacity: '50%' }  : { opacity : '100%' };

    return (
      <div class='die'>
        <p>one die</p>
        <img style={dieHeldStyle}
          src={require("../../assets/dice_" + diceVal + ".png")}
          alt={"Dice with value = " + diceVal}
          onClick={this.toggleHold}
        />
      </div>
    )
  }
}

export default Die;
