import { actionType } from "./action";
const today = new Date();
const oneMonthAgo = new Date(today);
oneMonthAgo.setMonth(today.getMonth() - 1);

const formatDate = (date: Date): string => date.toISOString().split("T")[0];

interface FilterState {
  filters: {
    [key: string]: any;
  };
}

const INITIAL_STATE: FilterState = {
  filters: {
    dateRange: {
      fromDate: formatDate(oneMonthAgo),
      toDate: formatDate(today),
    },
  },
};

interface SetFiltersAction {
  type: typeof actionType.SET_FILTERS;
  payload: {
    key: string;
    filters: any;
  };
}

interface ClearFiltersAction {
  type: typeof actionType.CLEAR_FILTER;
}

type FilterActions = SetFiltersAction | ClearFiltersAction;

const FilterReducer = (
  state: FilterState = INITIAL_STATE,
  action: FilterActions
): FilterState => {
  switch (action.type) {
    case actionType.CLEAR_FILTER:
      return {
        ...state,
        filters: {},
      };

    case actionType.SET_FILTERS: {
      const { key, filters } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [key]: { ...state.filters[key], ...filters },
        },
      };
    }

    default:
      return state;
  }
};

export default FilterReducer;
