export const START_NEW_GAME = 'START_NEW_GAME';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const PRE_ROLL = 'PRE_ROLL';
export const ROLL_DICE = 'ROLL_DICE';
export const CHANGE_TURN = 'CHANGE_TURN';
export const INITIAL_ROLL_ROLL_OFF = 'INITIAL_ROLL_ROLL_OFF';
export const HOLD_DICE = 'HOLD_DICE';
export const SCORE_CURRENT_DICE = 'SCORE_CURRENT_DICE';
export const ENABLE_ROLL_AGAIN = 'ENABLE_ROLL_AGAIN';

export const startNewGame = (numberOfPlayers) => {
    // create players
    const players = createPlayers(numberOfPlayers);
    const action =  {
      type: START_NEW_GAME,
      players
    }
    return action;

}

export const roll = () => {
  const diceRoll = rollDice(6);
  const dice = {}
  for (var die in diceRoll) {
    // add one to the identifier of the dice object so dice 1 is one and not 0 and so on.
    var index = parseInt(die) + 1
    dice[index] = {
                    value: diceRoll[die],
                    isHeld: false
                  };
  }

  return {
    type: ROLL_DICE,
    dice
  }
}

const rollDice = (numDice = 1) => {
  var diceRoll = []
  for (var i = 0; i < numDice; i ++) {
    var dieRoll = Math.floor((Math.random() * 6) + 1);
    diceRoll.push(dieRoll);
  }
  return diceRoll;
}

export const preRoll = (playerId) => {
  const diceRoll = Math.floor((Math.random() * 6) + 1)
  console.log('dice roll = ' + diceRoll);
  return {
    type: PRE_ROLL,
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

export const holdDice = (diceToHold, dice) => {
  for (var die in diceToHold) {
    dice[die].isHeld = true;
  }
  return {
    type: HOLD_DICE,
    dice
  }
}

export const scoreCurrentDice = (score) => {
  return {
    type: SCORE_CURRENT_DICE,
    score
  }
}

export const enableRollAgain = (playerID) => {
  return {
    type: ENABLE_ROLL_AGAIN,
    playerID
  }
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
