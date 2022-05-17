import { combineReducers } from "redux";
import { getBooks } from "./booksReducers/booksReducers";
import { loginStates } from "./loginStates/loginState";
import { cartReducer } from "./cartReducer/cartReducer";
import { orderReducer } from "./orderReducer/orderReducer";

export const rootReducer = combineReducers({
  Books: getBooks,
  loginStates: loginStates,
  cart: cartReducer,
  checkout: orderReducer,
});
