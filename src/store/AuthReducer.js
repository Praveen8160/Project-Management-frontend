import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_ERROR } from "./Authaction.js";

// Initial state for authentication
const INITIAL_STATE = {
  isAuthenticated: false,
  error: null,
};

// Reducer function for authentication
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload,
        error: null,
      };
    case LOGOUT_SUCCESS:
      console.log("logout", state);
      return {
        ...state,
        isAuthenticated: false,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
