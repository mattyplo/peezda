import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { startNewGame } from '../../redux/actions/gameActions';

class NewGameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfOpponents: "one",
      createNewGame: false
    };

    this.changeNumberOpponents = this.changeNumberOpponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // fire startNewGame action
    this.props.startNewGame();
    // change local State createNewGame to true
    this.setState({
      createNewGame: true
    })
  }

  changeNumberOpponents(event) {
    this.setState({ numberOfOpponents: event.target.value })
  }

  render() {

    console.log(this.state.numberOfOpponents)

    // If user creates newGame, redirect to the Game component.
    if (this.state.createNewGame) {
       return (<Redirect to={{
         pathname: '/match',
         state: { numberOfOpponents: this.state.numberOfOpponents }
       }} />)
    }

    return (
      <div className="NewGame">
        <form onSubmit={this.handleSubmit}>
          <label for="number of players">Number of Opponents</label>
          <select id="numberOfPlayers" name="numberOfPlayers" onChange={this.changeNumberOpponents}>
            <option value="one">one</option>
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startNewGame: () => dispatch(startNewGame())
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(NewGameForm);
