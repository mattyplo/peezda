import reducer from './game.js';
import { START_NEW_GAME } from '../actions/gameActions.js';

describe('game reducer', () => {
  it('should return the intial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        gameInSession: false
      })
  })

  it('should handle CREATE_NEW_GAME', () => {
    expect(
      reducer({}, {
        type: START_NEW_GAME,
      })
    ).toEqual(
      {
        gameInSession: true
      })
  })
})