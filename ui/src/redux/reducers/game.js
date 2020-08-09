const initialState = {
  canEndTurn: false,
  checkedForPeezda: false,
  currentRollScore: 0,
  gameInSession: false,
  players: {},
  turn: null,
  dice: {
    1: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
    2: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
    3: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
    4: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
    5: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
    6: {
      value: 1,
      isHeld: false,
      markedToHold: false
    },
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'FLAG_CHECKED_FOR_PEEZDA_TRUE':
      return {...state,
        checkedForPeezda: true
      }

    case 'START_NEW_GAME':
      return {...state,
      gameInSession: true,
      players: action.players
    }

    case 'PRE_ROLL':
      return {...state,
        players: {
          ...state.players,
          [action.playerId]: {
            ...state.players[action.playerId],
            roll: action.diceRoll,
            preGameRollOff: false
          }
        }
      }

    case 'ROLL_DICE':
      return {...state,
        checkedForPeezda: false,
        dice: action.dice
      }

    case 'CHANGE_TURN':
      return {...state,
        turn: action.playerId,
        players: {
          ...state.players,
          [action.playerId]: {
            ...state.players[action.playerId],
            rollIsEnabled: true
          }
        }
      }

    case 'INITIAL_ROLL_ROLL_OFF':
      return {...state,
        players: action.updatedPlayers
      }

    case 'SCORE_CURRENT_DICE':
      return {...state,
        currentRollScore: state.currentRollScore + action.score
      }

    case 'ENABLE_PLAYER_TO_ROLL':
      return {...state,
        players: {
          ...state.players,
          [action.playerID]: {
            ...state.players[action.playerID],
            rollIsEnabled: true
          }
        }
      }

    case 'DISALLOW_PLAYER_TO_ROLL':
      return {...state,
        players: {
          ...state.players,
          [action.playerID]: {
            ...state.players[action.playerID],
            rollIsEnabled: false
          }
        }
      }

    case 'CANNOT_END_TURN':
      return {...state,
        canEndTurn: false
      }

    case 'CAN_END_TURN':
      return {...state,
        canEndTurn: true
      }

    case 'HOLD_DICE':
      return {...state,
        dice: action.newDice
      }

    case 'TOGGLE_MARKED_TO_HOLD':
      return {...state,
        dice: {
          ...state.dice,
          [action.diceId]: {
            ...state.dice[action.diceId],
            markedToHold: !state.dice[action.diceId].markedToHold
          }
        }
      }

    default: {
      return state;
    }
  }
}

export default game;
