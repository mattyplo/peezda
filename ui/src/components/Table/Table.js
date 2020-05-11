import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Die from '../Die/Die.js';
import './Table.css';

class Table extends Component {
  
  render() {

    const { dice } = this.props;

    return (
      <div id='table' >
        <p> table </p>
        <Die value={dice[1].value}/>
        <Die value={dice[2].value}/>
        <Die value={dice[3].value}/>
        <Die value={dice[4].value}/>
        <Die value={dice[5].value}/>
        <Die value={dice[6].value}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dice: state.game.dice
  }
}

export default compose(connect(mapStateToProps))(Table);
