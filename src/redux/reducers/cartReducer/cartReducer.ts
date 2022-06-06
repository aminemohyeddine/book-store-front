import { BookI } from "../../../constants/interfaces";
import { CartContants } from "../../constants/CartConstants";

interface cartAction {
  type:
    | CartContants.addBookToCart
    | CartContants.addCartFromLocalStorage
    | CartContants.DeleteBookFromCart
    | CartContants.deleteAllBooksFromCart
    | CartContants.cartState;

  payload: any;
  cartItems: any;
}
export const cartReducer = (
  state = { cart: [], cartState: false },
  action: cartAction
) => {
  switch (action.type) {
    case CartContants.addBookToCart:
      const targetBook = action.payload.books.find(
        (book: BookI) => book._id === action.payload.id
      );
      const bookInCart = state.cart?.find(
        (book: BookI) => book._id === action.payload.id
      );

      return {
        ...state,
        cart:
          bookInCart === undefined
            ? [...state.cart, targetBook]
            : [...state.cart],
      };
    //addCartFromLocalStorage
    case CartContants.addCartFromLocalStorage:
      return {
        ...state,
        cart: action.cartItems,
      };
    case CartContants.cartState:
      return {
        ...state,
        cartState: action.payload.state,
      };
    case CartContants.DeleteBookFromCart:
      return {
        ...state,
        cart: state.cart.filter(
          (item: BookI) => item._id !== action.payload.id
        ),
      };
    case CartContants.deleteAllBooksFromCart:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
