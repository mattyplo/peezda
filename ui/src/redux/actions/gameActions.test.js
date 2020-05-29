import * as gameActions from './gameActions.js';

describe('gameActions', () => {
  it('should create an action to start new game', () => {
    const expectedAction = {
      type: gameActions.START_NEW_GAME,
      players: {
        1: {
          isHuman: true,
          roll: null,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0,
        },
        2: {
          isHuman: false,
          roll: null,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0,
        },
      },
    }
    expect(gameActions.startNewGame(2)).toEqual(expectedAction);
  })

  describe('determineOrder', () => {
    it('should return type: CHANGE_TURN, playerId: 1, when player 1 has high roll', () => {
      const mockPlayers = {
        1: {
          isHuman: true,
          roll: 6,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        2: {
          isHuman: false,
          roll: 4,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        3: {
          isHuman: false,
          roll: 4,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        4: {
          isHuman: false,
          roll: 4,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        }
      }
      const expectedAction = {
        type: gameActions.CHANGE_TURN,
        playerId: "1"
      }
      expect(gameActions.determineOrder(mockPlayers)).toEqual(expectedAction);
    })

    it('Should return type: INITIAL_ROLL_ROLL_OFF, on tie', () => {
      const mockPlayers = {
        1: {
          isHuman: true,
          roll: 6,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        2: {
          isHuman: false,
          roll: 6,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        3: {
          isHuman: false,
          roll: 4,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        4: {
          isHuman: false,
          roll: 4,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        }
      }
      const expectedAction = {
        type: gameActions.INITIAL_ROLL_ROLL_OFF,
        players: {
          1: {
            isHuman: true,
            roll: null,
            preGameRollOff: true,
            rollIsEnabled: false,
            score: 0
          },
          2: {
            isHuman: false,
            roll: null,
            preGameRollOff: true,
            rollIsEnabled: false,
            score: 0
          },
          3: {
            isHuman: false,
            roll: 0,
            preGameRollOff: false,
            rollIsEnabled: false,
            score: 0
          },
          4: {
            isHuman: false,
            roll: 0,
            preGameRollOff: false,
            rollIsEnabled: false,
            score: 0
          }
        }
      }
      expect(gameActions.determineOrder(mockPlayers)).toEqual(expectedAction);
    })

    it('Should return type: INITIAL_ROLL_ROLL_OFF, on second tie', () => {
      const mockPlayers = {
        1: {
          isHuman: true,
          roll: 0,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        2: {
          isHuman: false,
          roll: 6,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        3: {
          isHuman: false,
          roll: 6,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        },
        4: {
          isHuman: false,
          roll: 0,
          preGameRollOff: false,
          rollIsEnabled: false,
          score: 0
        }
      }
      const expectedAction = {
        type: gameActions.INITIAL_ROLL_ROLL_OFF,
        players: {
          1: {
            isHuman: true,
            roll: 0,
            preGameRollOff: false,
            rollIsEnabled: false,
            score: 0
          },
          2: {
            isHuman: false,
            roll: null,
            preGameRollOff: true,
            rollIsEnabled: false,
            score: 0
          },
          3: {
            isHuman: false,
            roll: null,
            preGameRollOff: true,
            rollIsEnabled: false,
            score: 0
          },
          4: {
            isHuman: false,
            roll: 0,
            preGameRollOff: false,
            rollIsEnabled: false,
            score: 0
          }
        }
      }
      expect(gameActions.determineOrder(mockPlayers)).toEqual(expectedAction);
    })
  })
})
