import firebase from '@/api/firebase';

const INITIAL_STATE = {
  username: '',
  role: '',
};

const SET_CURRENT_USER = 'SET_CURRENT_USER';

// START: ACTIONS
export const setCurrentUser = (username) => (dispatch) => {
  firebase
    .database()
    .ref('/users')
    .child(username)
    .on('value', (snap) => {
      const data = snap.val()
      dispatch({
        type: SET_CURRENT_USER,
        username,
        role: data.role,
      });
    });
};
// END: ACTIONS

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        username: action.username,
        role: action.role, // 'admin' ||
      };

    default:
      return state;
  }
};

export default reducer;