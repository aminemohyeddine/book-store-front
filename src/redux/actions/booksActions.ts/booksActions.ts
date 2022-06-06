import { BooksConst } from "../../constants/booksConstants";
import { BookI } from "../../../constants/interfaces";
import { Dispatch } from "react";

export const getAllBooks = (allData: BookI[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.getAllBooks,
      payload: allData,
    });
  };
};

export const searchBook = (allBooks: BookI[], bookName: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.searchBook,
      payload: {
        allBooks: allBooks,
        bookName: bookName,
      },
    });
  };
};

export const getBook = (bookId: string | undefined) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.getBook,
      payload: {
        bookId,
      },
    });
  };
};

export const filterBooks = (books: BookI[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.filterBooks,
      payload: {
        books,
      },
    });
  };
};

export const filterModeIsOn = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.filterModeIsOn,
    });
  };
};

export const filterModeIsOff = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: BooksConst.filterModeIsOff,
    });
  };
};

export const deleteBook = (bookId: string | undefined) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "deleteBook",
      payload: {
        bookId,
      },
    });
  };
};

export const bookStateHasChanged = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "bookStateHasChanged",
    });
  };
};
