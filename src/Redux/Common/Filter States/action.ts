export const actionType = {
  CLEAR_FILTER: "CLEAR_FILTER",
  SET_FILTERS: "SET_FILTERS",
};

export const ClearFilter = (payload : any) => ({
  type: actionType.CLEAR_FILTER,
  payload,
});

export const SetFilters = (key: string, filters: any) => ({
  type: actionType.SET_FILTERS,
  payload: { key, filters },
});

