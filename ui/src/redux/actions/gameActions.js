export const START_NEW_GAME = 'START_NEW_GAME';
export const ADD_PLAYERS = 'ADD_PLAYERS';
export const ROLL_DICE = 'ROLL_DICE';

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
      roll: null
    }
  }
  return players;
}
