export const START_NEW_GAME = 'START_NEW_GAME';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const ROLL_DICE = 'ROLL_DICE';
export const CHANGE_TURN = 'CHANGE_TURN';
export const INITIAL_ROLL_ROLL_OFF = 'INITIAL_ROLL_ROLL_OFF';

export const startNewGame = (numberOfPlayers) => {
    // create players
    const players = createPlayers(numberOfPlayers);
    const action =  {
      type: START_NEW_GAME,
      players
    }
    return action;

}

export const rollDice = (playerId) => {
  const diceRoll = Math.floor((Math.random() * 6) + 1)
  console.log('dice roll = ' + diceRoll);
  return {
    type: ROLL_DICE,
    playerId,
    diceRoll
  }
}

export const determineOrder = (players) => {
  var highRoll = 0;
  var playersWithHighRoll = [];
  for (var playerId in players) {
    // if the player has the highest roll, they are now the sole player on the list.
    if (players[playerId].roll > highRoll) {
      playersWithHighRoll = [];
      playersWithHighRoll.push(playerId);
      highRoll = players[playerId].roll;
    } else if (players[playerId].roll === highRoll) {
      // The player shares a high roll with at least another player.
      playersWithHighRoll.push(playerId);
    }
  }
  // if only one player has the high roll, they go first.
  if (playersWithHighRoll.length === 1) {
    const playerIdWithHighRoll = playersWithHighRoll[0];
    //changeTurn(playerIdWithHighRoll);
    return {
      type: CHANGE_TURN,
      playerId: playerIdWithHighRoll
    }
  } else {
    // if more then one player share the high roll, they roll again.
    // generate update player rolls, and rollAgain fields.
    for (var playerId in players) {
      if (playersWithHighRoll.includes(playerId)) {
        players[playerId].roll = null;
        players[playerId].rollAgain = true;
      } else {
        players[playerId].roll = 0;
      }
    }
    return {
      type: INITIAL_ROLL_ROLL_OFF,
      players
    }
  }
}

export const changeTurn = (playerId) => {
  return {
    type: CHANGE_TURN,
    playerId
  }
}

export const initialRollFaceOff = (playerIds) => {

}

const createPlayers = (numberOfPlayers) => {
  // create an object of players,  player one is human. the rest are computer.
  let players = {};
  for (var i = 1; i <= numberOfPlayers; i ++) {
    let isHuman = false;
    if (i === 1) {
      isHuman =true;
    }
    players[i] = {
      isHuman,
      score: 0,
      roll: null,
      rollAgain: false
    }
  }
  return players;
}
