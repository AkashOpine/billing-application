// Define action types
export const loadingActionTypes = {
    START_LOADING: "START_LOADING",
    STOP_LOADING: "STOP_LOADING",
  };
  
  // Start loading action creator
  export const startLoading = () => ({
    type: loadingActionTypes.START_LOADING,
  });
  
  // Stop loading action creator
  export const stopLoading = () => ({
    type: loadingActionTypes.STOP_LOADING,
  });
  