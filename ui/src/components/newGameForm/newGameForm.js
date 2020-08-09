import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { startNewGame } from '../../redux/actions/gameActions';
import './newGameForm.css'

class NewGameForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfPlayers: "1",
      createNewGame: false,
      players: {
        player1: {
          type: "human"
        }
      }
    };

    this.changeNumberPlayers = this.changeNumberPlayers.bind(this);
    this.changePlayerType = this.changePlayerType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlayerState = this.updatePlayerState.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // fire startNewGame action
    // number of players = number of opponents + the user.
    // Need to convert numberOfPlayers in state to number
    // const numberOfPlayers = Number(this.state.numberOfPlayers) + 1;
    // Start a new game passing in number of players as an argument.

    //console.log(this.state.players);
    //this.props.startNewGame(numberOfPlayers);
    // change local State createNewGame to true

    const { players } = this.state;
    this.props.startNewGame(players)

    this.setState({
      createNewGame: true
    })
  }

  changeNumberPlayers(numPlayers) {
    this.setState({ numberOfPlayers: numPlayers })
  }

  changePlayerType(event) {
    // event.target.id -> playerID
    // event.target.value -> playerType
    const playerID = event.target.id;
    const playerType = event.target.value;

    this.setState(state => {
      return {
        ...state,
        players: {
          ...state.players,
          [playerID]: {
            ...state.players[playerID],
            type: playerType
          }
        }
      }
    })
  }

  updatePlayerState(event) {
    const players = this.state.players;
    const newNumPlayers = event.target.value;
    const currentNumPlayers = Object.keys(players).length;
    this.changeNumberPlayers(newNumPlayers);
    // if numPlayers is greater then the number of player objects, create new players.
    var newPlayers = {}
    if (newNumPlayers > currentNumPlayers) {
      // copy old players first
      for (var i = 1; i <= currentNumPlayers; i ++) {
        var currentPlayerID = "player" + Number(i);
        newPlayers[currentPlayerID] = {};
        newPlayers[currentPlayerID].type = players[currentPlayerID].type;
      }
      for (var i = currentNumPlayers + 1; i <= newNumPlayers; i ++) {
        var newPlayerID = "player" + Number(i);
        newPlayers[newPlayerID] = {};
        newPlayers[newPlayerID].type = "human";
      }
      this.setState(state => {
        return {
          ...state,
          players: newPlayers
        }
      })
    } else { // remove players that are over the newNumPlayers
      for (var i = 1; i <= newNumPlayers; i ++) {
        var currentPlayerID = "player" + Number(i);
        newPlayers[currentPlayerID] = {};
        newPlayers[currentPlayerID].type = players[currentPlayerID].type;
      }
      this.setState(state => {
        return {
          ...state,
          players: newPlayers
        }
      })
    }
  }

  render() {
    // If user creates newGame, redirect to the Game component.
    if (this.state.createNewGame) {
       return <Redirect to='/match'/>
    }

    // Create human / computer options for number of players
    const numberOfPlayers = parseInt(this.state.numberOfPlayers)
    const playerOptions = []
    for (var i = 1; i <= numberOfPlayers; i ++) {
      var playerID = "player" + Number(i);
      playerOptions.push(
        <div class="playerOptions">
          <label for={playerID}>{playerID}</label>
          <select id={playerID} name={playerID} onChange={this.changePlayerType}>
            <option value="human">human</option>
            <option value="computer">computer</option>
          </select>
        </div>
      )
    }

    return (
      <div className="NewGame">
        <form onSubmit={this.handleSubmit}>
          <label for="number of players">Number of Players</label>
          <select id="numberOfPlayers" name="numberOfPlayers" onChange={this.updatePlayerState}>
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
          </select>
          { playerOptions }
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
