import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { startNewGame } from '../../redux/actions/gameActions';

class NewGameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfOpponents: "1",
      createNewGame: false
    };

    this.changeNumberOpponents = this.changeNumberOpponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // fire startNewGame action
    // number of players = number of opponents + the user.
    // Need to convert numberOfOpponents in state to number
    const numberOfPlayers = Number(this.state.numberOfOpponents) + 1;
    // Start a new game passing in number of players as an argument.
    this.props.startNewGame(numberOfPlayers);
    // change local State createNewGame to true
    this.setState({
      createNewGame: true
    })
  }

  changeNumberOpponents(event) {
    this.setState({ numberOfOpponents: event.target.value })
  }

  render() {

    // If user creates newGame, redirect to the Game component.
    if (this.state.createNewGame) {
       return <Redirect to='/match'/>
    }

    return (
      <div className="NewGame">
        <form onSubmit={this.handleSubmit}>
          <label for="number of players">Number of Opponents</label>
          <select id="numberOfPlayers" name="numberOfPlayers" onChange={this.changeNumberOpponents}>
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
          </select>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startNewGame: (numberOfPlayers) => dispatch(startNewGame(numberOfPlayers))
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(NewGameForm);
