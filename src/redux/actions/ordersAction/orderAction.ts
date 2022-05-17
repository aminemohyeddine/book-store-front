import { Dispatch } from "react";
import { BookI } from "../../../constants/interfaces";
import { orderConst } from "../../constants/orderConstants";

export const addAddressDetailsCheckout = (addressDetails: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: orderConst.addCheckoutAddress,
      payload: { addressDetails },
    });
  };
};

export const addBooksCheckout = (Books: BookI[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: orderConst.addCheckoutBooks,
      payload: { Books },
    });
  };
};
