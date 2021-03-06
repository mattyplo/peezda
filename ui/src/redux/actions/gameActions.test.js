import * as gameActions from './gameActions.js';

describe('gameActions', () => {
  it('should create an action to start new game', () => {
    const expectedAction = {
      type: gameActions.START_NEW_GAME,
      players: {
        1: {
          isHuman: true,
          roll: null,
          preGameRollOff: true,
          rollIsEnabled: false,
          score: 0,
        },
        2: {
          isHuman: false,
          roll: null,
          preGameRollOff: true,
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
        updatedPlayers: {
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
        updatedPlayers: {
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

  describe('rollAgain()', () => {
    it('returns all newly rolled dice not held when dice in argument are all held', () => {
      const preDice = { 1: { isHeld: true,
                          value: 2 },
                     2: { isHeld: true,
                          value: 3 },
                     3: { isHeld: true,
                          value: 3 },
                     4: { isHeld: true,
                          value: 3 },
                     5: { isHeld: true,
                          value: 6 },
                     6: { isHeld: true,
                          value: 6 }
                        }
      expect(gameActions.rollAgain(preDice)).toMatchObject({ dice: { 1: { isHeld: false },
                                                                 2: { isHeld: false },
                                                                 3: { isHeld: false },
                                                                 4: { isHeld: false },
                                                                 5: { isHeld: false },
                                                                 6: { isHeld: false }
                                                               }})
    })
  })

  describe('Can End Turn', () => {
    it('has score, currentRollScore meets min score and one non scoring dice should return CAN_END_TURN,', () => {
      const player = { score: 1000 }
      const dice = { 1: { isHeld: true },
                     2: { isHeld: true },
                     3: { isHeld: true },
                     4: { isHeld: true },
                     5: { isHeld: true },
                     6: { isHeld: false,
                          value: 6
                     }
                   }
      const currentRollScore = 350;
      const expectedAction = {
        type: gameActions.CAN_END_TURN
      }
      expect(gameActions.canEndTurn(player, dice, currentRollScore)).toEqual(expectedAction);
    })

    it('has no score, currentRollScore is 0 and scoring dice = 300 should return CANNOT_END_TURN', () => {
      const player = { score: 0 }
      const dice = { 1: { isHeld: false,
                          value: 2 },
                     2: { isHeld: false,
                          value: 3 },
                     3: { isHeld: false,
                          value: 3 },
                     4: { isHeld: false,
                          value: 3 },
                     5: { isHeld: false,
                          value: 6 },
                     6: { isHeld: false,
                          value: 6 }
                        }
      const currentRollScore = 0;
      const expectedAction = {
        type: gameActions.CANNOT_END_TURN
      }
      expect(gameActions.canEndTurn(player, dice, currentRollScore)).toEqual(expectedAction);
    })
  })
})
