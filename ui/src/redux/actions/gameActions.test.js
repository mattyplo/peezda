import * as gameActions from './gameActions.js';

describe('gameActions', () => {
  it('should create an action to start new game', () => {
    const expectedAction = {
      type: gameActions.START_NEW_GAME,
      players: {
        1: {
          isHuman: true,
          roll: null,
          rollAgain: false,
          score: 0,
        },
        2: {
          isHuman: false,
          roll: null,
          rollAgain: false,
          score: 0,
        },
      },
    }
    expect(gameActions.startNewGame(2)).toEqual(expectedAction);
  })
})
