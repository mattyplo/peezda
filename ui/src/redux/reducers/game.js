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

    default: {
      return state;
    }
  }
}

export default game;
