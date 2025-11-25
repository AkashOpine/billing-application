import { actionTypes } from "./action";

const INITIAL_STATE = {
  AddVendorRes: null,
  EditVendorRes: null,
  GetVendorRes: null,
  DeleteVendorRes: null,
  GetVendorList: null,
  GetVendorByIdRes: null,
  GetVendorByPhoneRes: null,
  GetPurchaseByVendorRes: null,
  GetPurchaseAmountByVendorRes:null,
};
const VendorReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Vendors
    case actionTypes.ADD_VENDOR:
      return {
        ...state,
        AddVendorRes: action.payload,
      };
    case actionTypes.ADD_VENDOR_CLEAR:
      return {
        ...state,
        AddVendorRes: null,
      };
    case actionTypes.EDIT_VENDOR:
      return {
        ...state,
        EditVendorRes: action.payload,
      };
    case actionTypes.EDIT_VENDOR_CLEAR:
      return {
        ...state,
        EditVendorRes: null,
      };
    case actionTypes.GET_VENDOR:
      return {
        ...state,
        GetVendorRes: action.payload,
      };
    case actionTypes.DELETE_VENDOR:
      return {
        ...state,
        DeleteVendorRes: action.payload,
      };
    case actionTypes.GET_VENDOR_LIST:
      return {
        ...state,
        GetVendorList: action.payload,
      };

    case actionTypes.GET_VENDOR_BY_ID:
      return {
        ...state,
        GetVendorByIdRes: action.payload,
      };
    case actionTypes.CLEAR_VENDOR_BY_ID:
      return {
        ...state,
        GetVendorByIdRes: null,
      };

    case actionTypes.GET_VENDOR_BY_PHONE:
      return {
        ...state,
        GetVendorByPhoneRes: action.payload,
      };
    case actionTypes.CLEAR_VENDOR_BY_PHONE:
      return {
        ...state,
        GetVendorByPhoneRes: null,
      };

    case actionTypes.GET_PURCHASE_BY_VENDOR:
      return {
        ...state,
        GetPurchaseByVendorRes: action.payload,
      };
    case actionTypes.CLEAR_PURCHASE_BY_VENDOR:
      return {
        ...state,
        GetPurchaseByVendorRes: null,
      };

    case actionTypes.GET_PURCHASE_AMOUNT_BY_VENDOR:
      return {
        ...state,
        GetPurchaseAmountByVendorRes: action.payload,
      };
    case actionTypes.CLEAR_PURCHASE_AMOUNT_BY_VENDOR:
      return {
        ...state,
        GetPurchaseAmountByVendorRes: null,
      };
    default:
      return state;
  }
};

export default VendorReducers;
