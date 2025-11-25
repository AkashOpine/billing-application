import { actionTypes } from "./action";

const INITIAL_STATE = {
  GetDashboardCardRes: null,
  GetSalesGraphRes: null,
  GetMostSellingGraphRes: null,
};

const DashboardReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //dashboard
    case actionTypes.GET_DASHBOARD_CARD:
      return {
        ...state,
        GetDashboardCardRes: action.payload,
      };
    case actionTypes.GET_SALES_GRAPH:
      return {
        ...state,
        GetSalesGraphRes: action.payload,
      };
    case actionTypes.GET_MOST_SELLING_GRAPH:
      return {
        ...state,
        GetMostSellingGraphRes: action.payload,
      };
    default:
      return state;
  }
};

export default DashboardReducers;
