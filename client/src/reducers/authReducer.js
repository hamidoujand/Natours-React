export let SIGN_UP_START = "SIGN_UP_START";
export let SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export let SIGN_UP_FAILED = "SIGN_UP_FAILED";
export let SIGN_UP_ERROR_RESET = "SIGN_UP_ERROR_RESET";
export let LOGIN_START = "LOGIN_START";
export let LOGIN_SUCCESS = "LOGIN_SUCCESS";
export let LOGIN_FAILED = "LOGIN_FAILED";
export let LOGIN_ERROR_RESET = "LOGIN_ERROR_RESET";
export let GET_USER_SUCCESS = "GET_USER_SUCCESS";
export let GET_USER_FAILED = "GET_USER_FAILED";
export let UPDATE_USER_START = "UPDATE_USER_START";
export let UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export let UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export let UPDATE_PASSWORD_START = "UPDATE_PASSWORD_START";
export let UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export let UPDATE_PASSWORD_FAILED = "UPDATE_PASSWORD_FAILED";

const INITIAL_STATE = {
  // login: false,
  user: null,
  error: null,
  loading: false,
};

let authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        // login: true,
        user: action.payload,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_UP_ERROR_RESET:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_ERROR_RESET:
      return {
        ...state,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
