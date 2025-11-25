import { billingAPI } from "../../../Config/ApiClient";
import { downloadBase64File } from "../../../Lib/ExportUtils";
export const actionTypes = {
  GET_SALES_REPORT: "GET_SALES_REPORT",
  EXPORT_SALES_REPORT: "EXPORT_SALES_REPORT",
  CLEAR_EXPORT_SALES_REPORT: "CLEAR_EXPORT_SALES_REPORT",
  GET_GST_REPORT: "GET_GST_REPORT",
  EXPORT_GST_REPORT: "EXPORT_GST_REPORT",
  CLEAR_EXPORT_GST_REPORT: "CLEAR_EXPORT_GST_REPORT",
};

export const GetSalesReport = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `report/sales?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=invoiceId,desc&searchText=${data.searchText}&customerId=${data.custId}&from=${data.fromDate}&to=${data.toDate}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_SALES_REPORT,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting list:", error);
    });
};

export const ExportSalesReport = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `report/sales/export?org_id=${data.org_id}&branch_id=${data.branchId}&searchText=${data.searchText}&customerId=${data.custId}&from=${data.fromDate}&to=${data.toDate}`
    )
    .then((response) => {
      const responseData = response?.data;
      console.log("data",responseData);
      
      if (responseData?.code === 200 && responseData?.status === "Sucess") {
        downloadBase64File(responseData?.data,responseData?.message) 
      }
      dispatch({
        type: actionTypes.EXPORT_SALES_REPORT,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting list:", error);
    });
};
export const ClearExportSalesReport = () => ({
  type: actionTypes.CLEAR_EXPORT_SALES_REPORT,
});


export const GetGstReport = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `report/gst/by-service?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=invoiceId,desc&searchText=${data.searchText}&customerId=${data.custId}&from=${data.fromDate}&to=${data.toDate}&gst=${data.gstId}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_GST_REPORT,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting list:", error);
    });
};

export const ExportGstReport = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `report/gst/by-service/export?org_id=${data.org_id}&branch_id=${data.branchId}&searchText=${data.searchText}&customerId=${data.custId}&from=${data.fromDate}&to=${data.toDate}&gst=${data.gstId}`
    )
    .then((response) => {
        const responseData = response?.data;
      console.log("data",responseData);
      
      if (responseData?.code === 200 && responseData?.status === "Sucess") {
        downloadBase64File(responseData?.data,responseData?.message) 
      }
      dispatch({
        type: actionTypes.EXPORT_GST_REPORT,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting list:", error);
    });
};
export const ClearExportGstReport = () => ({
  type: actionTypes.CLEAR_EXPORT_GST_REPORT,
});
