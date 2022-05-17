import { Dispatch } from "react";
import { CartContants } from "../../constants/CartConstants";
import { BookI } from "../../../constants/interfaces";

export const addBookToCart = (id: string, books: BookI[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: CartContants.addBookToCart,
      payload: { id, books },
    });
  };
};

export const DeleteBookFromCart = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: CartContants.DeleteBookFromCart,
      payload: { id },
    });
  };
};

export const deleteAllBooksFromCart = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: CartContants.deleteAllBooksFromCart,
    });
  };
};

export const addCartFromLocalStorage = (cartItems: BookI[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: CartContants.addCartFromLocalStorage,
      cartItems,
    });
  };
};
