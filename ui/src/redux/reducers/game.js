const initialState = {
  gameInSession: false
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case 'START_NEW_GAME':
      return {...state,
      gameInSession: true
    }

    default: {
      return state;
    }
  }
}

export default game;
