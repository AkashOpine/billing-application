import { loadingActionTypes } from "./action";


// Define the initial state
const INITIAL_STATE = {
  isLoading: false,
};

// Reducer function
export default (state = INITIAL_STATE, action : any) => {
  switch (action.type) {
    case loadingActionTypes.START_LOADING:
      return { isLoading: true };
    case loadingActionTypes.STOP_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
};
