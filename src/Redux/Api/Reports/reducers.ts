import { actionTypes } from "./action";

const INITIAL_STATE = {
  GetSalesReportRes: null,
  ExportSalesReportRes: null,
  GetGstReportRes: null,
  ExportGstReportRes: null,
};

const ReportReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Reports
    case actionTypes.GET_SALES_REPORT:
      return {
        ...state,
        GetSalesReportRes: action.payload,
      };

    case actionTypes.EXPORT_SALES_REPORT:
      return {
        ...state,
        ExportSalesReportRes: action.payload,
      };
    case actionTypes.CLEAR_EXPORT_SALES_REPORT:
      return {
        ...state,
        ExportSalesReportRes: null,
      };
    case actionTypes.GET_GST_REPORT:
      return {
        ...state,
        GetGstReportRes: action.payload,
      };

    case actionTypes.EXPORT_GST_REPORT:
      return {
        ...state,
        ExportGstReportRes: action.payload,
      };
       case actionTypes.CLEAR_EXPORT_GST_REPORT:
      return {
        ...state,
        ExportGstReportRes: null,
      };
    default:
      return state;
  }
};

export default ReportReducers;
