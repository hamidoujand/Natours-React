export let FETCH_TOURS_START = "FETCH_TOURS_START";
export let FETCH_TOURS_SUCCESS = "FETCH_TOURS_SUCCESS";
export let FETCH_TOURS_FAILED = "FETCH_TOURS_FAILED";
export let FETCH_SINGLE_TOUR_START = "FETCH_SINGLE_TOUR_START";
export let FETCH_SINGLE_TOUR_SUCCESS = "FETCH_SINGLE_TOUR_SUCCESS";
export let FETCH_SINGLE_TOUR_FAILED = "FETCH_SINGLE_TOUR_FAILED";

const INITIAL_STATE = {
  tours: [],
  loading: false,
  errors: null,
};

let toursReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TOURS_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        tours: action.payload,
      };

    case FETCH_TOURS_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case FETCH_SINGLE_TOUR_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_SINGLE_TOUR_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        tours: [action.payload],
      };
    case FETCH_SINGLE_TOUR_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default toursReducer;
