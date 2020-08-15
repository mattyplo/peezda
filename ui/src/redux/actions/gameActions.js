import { getDiceNotHeld, getNumOfAKind, getScoreOfDice } from '../../utility/rules.js';

export const START_NEW_GAME = 'START_NEW_GAME';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const PRE_ROLL = 'PRE_ROLL';
export const ROLL_DICE = 'ROLL_DICE';
export const CHANGE_TURN = 'CHANGE_TURN';
export const INITIAL_ROLL_ROLL_OFF = 'INITIAL_ROLL_ROLL_OFF';
export const HOLD_DICE = 'HOLD_DICE';
export const SCORE_CURRENT_DICE = 'SCORE_CURRENT_DICE';
export const ENABLE_PLAYER_TO_ROLL = 'ENABLE_PLAYER_TO_ROLL';
export const DISALLOW_PLAYER_TO_ROLL = 'DISALLOW_PLAYER_TO_ROLL';
export const CAN_END_TURN = 'CAN_END_TURN';
export const CANNOT_END_TURN = 'CANNOT_END_TURN';
export const FLAG_CHECKED_FOR_PEEZDA_TRUE = 'FLAG_CHECKED_FOR_PEEZDA_TRUE';
export const TOGGLE_MARKED_TO_HOLD = 'TOGGLE_MARKED_TO_HOLD';
export const PLAYER_ROLL_ENABLED = 'PLAYER_ROLL_ENABLED';

export const startNewGame = (playerTypes) => {
    // create players
    const players = createPlayers(playerTypes);
    const action =  {
      type: START_NEW_GAME,
      players
    }
    return action;
}

const createPlayers = (players) => {
  // create an object of players,  player one is human. the rest are computer.
  let updatedPlayers = {};

  var counter = 1;
  Object.keys(players).forEach((key) => {
    var isHuman = players[key].type === 'human' ? true : false;
    updatedPlayers[counter] = {
      isHuman,
      score: 0,
      roll: null,
      preGameRollOff: true,
      rollIsEnabled: true
    }
    counter ++;
  })

  // for (var i = 0; i <= numberOfPlayers; i ++) {
  //   let isHuman = false;
  //   if (i === 1) {
  //     isHuman =true;
  //   }
  //   players[i] = {
  //     isHuman,
  //     score: 0,
  //     roll: null,
  //     preGameRollOff: true,
  //     rollIsEnabled: false
  //   }
  // }
  return updatedPlayers;
}

export const roll = (dice) => {
  var newDice = {};
  var diceRoll = [];
  const diceNotHeld = getDiceNotHeld(dice);
  const numDiceNotHeld = Object.keys(diceNotHeld).length
  // if all Die are held roll all dice or all die are not held (initial roll)
  if ( numDiceNotHeld === 0 || numDiceNotHeld === 6 ) {
    diceRoll = rollDice(6);
    for (var die in diceRoll) {
      // add one to the identifier of the dice object so dice 1 is one and not 0 and so on.
      var index = parseInt(die) + 1
      newDice[index] = {
                      value: diceRoll[die],
                      isHeld: false,
                      markedToHold: false
                    };
    }
    return {
      type: ROLL_DICE,
      dice: newDice
    }
  } else { // else roll dice not held
    const diceRoll = rollDice(numDiceNotHeld)
    var diceRollIndex = 0;
    for (var die in dice) {
      if (dice[die].isHeld || dice[die].markedToHold) {
        newDice[die] = {
          isHeld: true,
          markedToHold: false,
          value: dice[die].value
        }
      } else { // The dice was not being held
        newDice[die] = {
          isHeld: false,
          markedToHold: false,
          value: diceRoll[diceRollIndex]
        }
        diceRollIndex ++;
      }
    }
    return {
      type: ROLL_DICE,
      dice: newDice
    }
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
    // generate update player rolls, and preGameRollOff fields.
    var updatedPlayers = {}
    for (var playerId in players) {
      updatedPlayers[playerId] = {};
      updatedPlayers[playerId].isHuman = players[playerId].isHuman;
      updatedPlayers[playerId].score = players[playerId].score;
      updatedPlayers[playerId].rollIsEnabled = players[playerId].rollIsEnabled;

      if (playersWithHighRoll.includes(playerId)) {
        updatedPlayers[playerId].roll = null;
        updatedPlayers[playerId].preGameRollOff = true;
        updatedPlayers[playerId].rollIsEnabled = true;
      } else {
        updatedPlayers[playerId].roll = 0;
        updatedPlayers[playerId].preGameRollOff = false;
      }
    }
    return {
      type: INITIAL_ROLL_ROLL_OFF,
      updatedPlayers
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
  var newDice = {};
  for (var die in dice) {
    if (diceToHold[die]) {
      newDice[die] = {
        value: diceToHold[die].value,
        isHeld: true
      };
    } else {
      newDice[die] = {
        value: dice[die].value,
        isHeld: dice[die].isHeld
      };
    }
  }
  return {
    type: HOLD_DICE,
    newDice
  }
}

export const scoreCurrentDice = (score) => {
  return {
    type: SCORE_CURRENT_DICE,
    score
  }
}

export const disallowPlayerToRoll = (playerID) => {
  return {
    type: DISALLOW_PLAYER_TO_ROLL,
    playerID
  }
}

export const enablePlayerToRoll = (playerID) => {
  return {
    type: ENABLE_PLAYER_TO_ROLL,
    playerID
  }
}

export const markCheckedForPeezda = () => {
  return {
    type: FLAG_CHECKED_FOR_PEEZDA_TRUE
  }
}

export const canEndTurn = (player, dice, currentRollScore) => {
  // get dice not held
  const diceNotHeld = getDiceNotHeld(dice);
  // get numOfAKind
  const numOfAKind = getNumOfAKind(diceNotHeld);
  // calculate score of dice not held
  const scoreOfDiceNotHeld = getScoreOfDice(diceNotHeld);
  // dieNotScored = is there a dice not scored of all dice?
  var dieNotScored = false;
  for (var die in diceNotHeld) {
    if (diceNotHeld[die].value !== 1 && diceNotHeld[die].value !== 5 &&
        numOfAKind[diceNotHeld[die].value - 1] < 3) {
          dieNotScored = true;
        }
  }
  const totalRollScore = currentRollScore + scoreOfDiceNotHeld;

  // The play reached the minimum, and has a none scoring dice, return true.

  if (((player.score === 0 && totalRollScore >= 500) ||
      (player.score !== 0 && totalRollScore >= 350)) &&
      dieNotScored) {
    return {
      type: CAN_END_TURN
    }
  }
  return {
    type: CANNOT_END_TURN
  }
}

export const toggleToHold = (diceId) => {
  return {
    type: TOGGLE_MARKED_TO_HOLD,
    diceId
  }
}
