import firebase from '@/api/firebase';

const INITIAL_STATE = {
  username: '',
  role: '',
  email: '',
  phoneNumber: '',
  altPhoneNumber: '',
};

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const UPDATE_CURRENT_USER_PHONE_NUMBER = 'UPDATE_CURRENT_USER_PHONE_NUMBER';
const UPDATE_CURRENT_USER_ALT_PHONE_NUMBER = 'UPDATE_CURRENT_USER_ALT_PHONE_NUMBER';

// START: ACTIONS
export const setCurrentUser = (username, email) => (dispatch) => {
  firebase
    .database()
    .ref('/users')
    .child(username)
    .on('value', (snap) => {
      // TODO: remove { role: 'admin' }
      const data = snap.val() || { role: 'admin' };
      console.log(data);
      dispatch({
        type: SET_CURRENT_USER,
        username,
        role: data.role,
        email,
        phoneNumber: data.phoneNumber,
        altPhoneNumber: data.altPhoneNumber,
      });
    });
};

export const getCurrentUser = (dispatch, getState) => {
  dispatch({type: GET_CURRENT_USER});
}
// END: ACTIONS

const reducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case SET_CURRENT_USER:
      //state.username = action.username;
      //state.role = action.role;
      //state.email = action.email;
      //state.phoneNumber = action.phoneNumber;
      //state.altPhoneNumber = action.altPhoneNumber;
      //console.log(state);
      return {
        ...state,
        username: action.username,
        role: action.role,
        email: action.email,
        phoneNumber: action.phoneNumber,
        altPhoneNumber: action.altPhoneNumber,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        role: action.role,
        email: action.email,
        phoneNumber: action.phoneNumber,
        altPhoneNumber: action.altPhoneNumber,
      };
    case UPDATE_CURRENT_USER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber,
      };
      case UPDATE_CURRENT_USER_ALT_PHONE_NUMBER:
        return {
          ...state,
          altPhoneNumber: action.altPhoneNumber,
        };
    default:
      return state;
  }
};

export default reducer;