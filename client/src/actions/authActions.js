import axios from "axios";
import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  LOGIN_ERROR_RESET,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGN_UP_ERROR_RESET,
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
} from "../reducers/authReducer";

export let signup = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_UP_START });
    let response = await axios.post("/api/v1/users/signup", formData);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: response.data.data.user,
    });
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILED,
      payload: error.response.data,
    });
  }
};

export let signupErrorsReset = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_ERROR_RESET,
  });
};

export let login = (loginData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    let res = await axios.post("/api/v1/users/login", loginData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.data.user });
    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data,
    });
  }
};

export let loginErrorReset = () => (dispatch) => {
  dispatch({
    type: LOGIN_ERROR_RESET,
  });
};

export let getUser = () => async (dispatch) => {
  try {
    let res = await axios.get("/api/v1/users/get-me");
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data.data.user,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
    });
  }
};

export let updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_START });
    let res = await axios.patch("/api/v1/users/update-me", formData);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data.data.user });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILED, payload: error.response.data });
  }
};

export let updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_START });
    let res = await axios.patch("/api/v1/users/update-password", formData);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: res.data.data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILED,
      payload: error.response.data,
    });
  }
};
