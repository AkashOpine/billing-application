
import { billingAPI } from "../../../Config/ApiClient";

export const actionTypes = {
  GET_DASHBOARD_CARD: "GET_DASHBOARD_CARD",
  GET_SALES_GRAPH: "GET_SALES_GRAPH",
  GET_MOST_SELLING_GRAPH: "GET_MOST_SELLING_GRAPH",
};

export const GetDashboardCard = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`dashboard/cards/org/${data.org_id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_DASHBOARD_CARD,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
};

export const GetSalesGraph = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`dashboard/sales-graph/org/${data.org_id}/${data.type}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_SALES_GRAPH,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
};

export const GetMostSellingGraph = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `dashboard/most-selling-service/org/${data.org_id}/${data.type}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_MOST_SELLING_GRAPH,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
};
