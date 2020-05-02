const initialState = {
  gameInSession: false,
  players: {},
  turn: null,
  dice: {
    1: { value: 1 },
    2: { value: 1 },
    3: { value: 1 },
    4: { value: 1 },
    5: { value: 1 },
    6: { value: 1 },
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
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
            rollAgain: false
          }
        }
      }

    case 'ROLL_DICE':
      return {...state,
        dice: action.dice
      }

    case 'CHANGE_TURN':
      return {...state,
        turn: action.playerId
      }

    case 'INITIAL_ROLL_ROLL_OFF':
      return {...state,
        players: action.players
      }

    default: {
      return state;
    }
  }
}

export default game;
