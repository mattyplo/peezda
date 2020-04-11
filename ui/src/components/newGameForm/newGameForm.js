import React, { Component } from 'react';

class NewGameForm extends Component {

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="NewGame">
        <form onSubmit={this.handleSubmit}>
          <label for="number of players">Number of Opponents</label>
          <select id="numberOfPlayers" name="numberOfPlayers">
            <option value="one">two</option>
            <option value="two">three</option>
            <option value="three">four</option>
          </select>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default NewGameForm;
