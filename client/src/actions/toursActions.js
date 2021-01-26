import axios from "axios";
import {
  FETCH_SINGLE_TOUR_FAILED,
  FETCH_SINGLE_TOUR_START,
  FETCH_SINGLE_TOUR_SUCCESS,
  FETCH_TOURS_FAILED,
  FETCH_TOURS_START,
  FETCH_TOURS_SUCCESS,
} from "../reducers/toursReducer";

export let fetchTours = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TOURS_START });
    let response = await axios.get("/api/v1/tours");
    dispatch({
      type: FETCH_TOURS_SUCCESS,
      payload: response.data.data.tours,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOURS_FAILED,
      payload: error.response.data,
    });
  }
};

export let fetchSingleTour = (tourId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SINGLE_TOUR_START });
    let response = await axios.get(`/api/v1/tours/${tourId}`);
    dispatch({
      type: FETCH_SINGLE_TOUR_SUCCESS,
      payload: response.data.data.tour,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_TOUR_FAILED,
      payload: error.response.data,
    });
  }
};
