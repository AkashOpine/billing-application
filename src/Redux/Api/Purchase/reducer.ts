import { actionTypes } from "./action";

const INITIAL_STATE = {
  AddPurchaseRes: null,
  EditPurchaseRes: null,
  GetPurchaseRes: null,
  DeletePurchaseRes: null,
  GetPurchaseById: null,
  GetPurchasePDF: null,
 
};

const PurchaseReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Purchases
    case actionTypes.ADD_PURCHASE:
      return {
        ...state,
        AddPurchaseRes: action.payload,
      };

    case actionTypes.ADD_PURCHASE_CLEAR:
      return {
        ...state,
        AddPurchaseRes: null,
      };

    case actionTypes.EDIT_PURCHASE:
      return {
        ...state,
        EditPurchaseRes: action.payload,
      };
    case actionTypes.EDIT_PURCHASE_CLEAR:
      return {
        ...state,
        EditPurchaseRes: null,
      };
    case actionTypes.GET_PURCHASE:
      return {
        ...state,
        GetPurchaseRes: action.payload,
      };
    case actionTypes.DELETE_PURCHASE:
      return {
        ...state,
        DeletePurchaseRes: action.payload,
      };
    case actionTypes.GET_PURCHASE_BY_ID:
      return {
        ...state,
        GetPurchaseById: action.payload,
      };

    case actionTypes.GET_PURCHASE_PDF:
      return {
        ...state,
        GetPurchasePDF: action.payload,
      };
      default:
      return state;
  }
};

export default PurchaseReducers;
