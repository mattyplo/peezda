import React, { Component } from 'react';

class NewGameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {numberOfOpponents: "one"};

    this.changeNumberOpponents = this.changeNumberOpponents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  changeNumberOpponents(event) {
    this.setState({ numberOfOpponents: event.target.value })
  }

  render() {
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

export default NewGameForm;
