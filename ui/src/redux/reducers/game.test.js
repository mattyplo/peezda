import reducer from './game.js';
import { START_NEW_GAME } from '../actions/gameActions.js';

describe('game reducer', () => {
  it('should return the intial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        gameInSession: false,
        players: {}
      })
  })

  it('should handle CREATE_NEW_GAME', () => {
    expect(
      reducer({}, {
        type: START_NEW_GAME,
        players: {
          1: {
            isHuman: true,
            score: 0,
          },
          2: {
            isHuman: false,
            score: 0,
          },
        }
      })
    ).toEqual(
      {
        gameInSession: true,
        players: {
          1: {
            isHuman: true,
            score: 0,
          },
          2: {
            isHuman: false,
            score: 0,
          },
        }
      })
  })
})
