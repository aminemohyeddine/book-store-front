import { orderConst } from "../../constants/orderConstants";
interface checkoutAction {
  type: orderConst.addCheckoutAddress | orderConst.addCheckoutBooks;

  payload: any;
}
export const orderReducer = (
  state = { checkoutDetails: [] },
  action: checkoutAction
) => {
  switch (action.type) {
    case orderConst.addCheckoutAddress:
      return {
        ...state,
        checkoutDetails: [{ adress: action.payload.addressDetails }],
      };

    case orderConst.addCheckoutBooks:
      return {
        ...state,
        checkoutDetails: [
          ...action.payload.checkoutDetails,
          { books: action.payload.books },
        ],
      };

    default:
      return state;
  }
};
