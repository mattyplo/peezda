import * as gameActions from './gameActions.js';

describe('gameActions', () => {
  it('should create an action to start new game', () => {
    const expectedAction = {
      type: gameActions.START_NEW_GAME
    }
    expect(gameActions.startNewGame()).toEqual(expectedAction);
  })
})
