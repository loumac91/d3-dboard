export const SET_ACTION_STATE = "SET_ACTION_STATE";
export const SET_CHART_DATA = "SET_CHART_DATA";
export const SET_LOADING_STATE = "SET_LOADING_STATE";

function createAsyncMutation(type) {
  return {
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`,
    PENDING: `${type}_PENDING`,
    loadingKey: `${type}_PENDING`,
    stateKey: `${type}_DATA`
  };
}

export const SET_CHART_DATA_ASYNC = createAsyncMutation(SET_CHART_DATA);
