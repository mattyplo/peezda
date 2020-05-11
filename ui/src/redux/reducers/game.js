const initialState = {
  gameInSession: false,
  players: {},
  turn: null,
  dice: {
    1: {
      value: 1,
      isHeld: false
    },
    2: {
      value: 1,
      isHeld: false
    },
    3: {
      value: 1,
      isHeld: false
    },
    4: {
      value: 1,
      isHeld: false
    },
    5: {
      value: 1,
      isHeld: false
    },
    6: {
      value: 1,
      isHeld: false 
    },
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
