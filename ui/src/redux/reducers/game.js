const initialState = {
  gameInSession: false,
  players: {},
  turn: null
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'START_NEW_GAME':
      return {...state,
      gameInSession: true,
      players: action.players
    }

    case 'ROLL_DICE':
      return {...state,
        players: {
          ...state.players,
          [action.playerId]: {
            ...state.players[action.playerId],
            roll: action.diceRoll
          }
        }
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
