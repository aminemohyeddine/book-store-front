import { BooksConst } from "../../constants/booksConstants";
import { BookI } from "../../../constants/interfaces";

interface booksAction {
  type:
    | BooksConst.getAllBooks
    | BooksConst.searchBook
    | BooksConst.getBook
    | BooksConst.deleteBook
    | BooksConst.filterModeIsOn
    | BooksConst.filterBooks
    | BooksConst.filterModeIsOff;
  payload: any;
}

export const getBooks = (
  state = {
    booksData: [],
    filtredBooksBysearch: [],
    singleBook: {},
    filtredMode: false,
    filtredBooks: [],
  },
  action: booksAction
) => {
  switch (action.type) {
    case BooksConst.getAllBooks:
      return { ...state, booksData: action.payload };
    case BooksConst.filterBooks:
      return { ...state, filtredBooks: action.payload.books };
    case BooksConst.searchBook:
      return {
        ...state,
        filtredBooksBysearch:
          action.payload.bookName === ""
            ? []
            : action.payload.allBooks.filter((book: BookI) => {
                return book.name
                  .toString()
                  .toLocaleLowerCase()
                  .includes(action.payload.bookName.toLocaleLowerCase());
              }),
      };
    case BooksConst.getBook:
      return {
        ...state,
        singleBook: state.booksData.filter((book: BookI) => {
          return book._id === action.payload.bookId;
        }),
      };

    case "deleteBook":
      return {
        ...state,
        booksData: state.booksData.filter((book: BookI) => {
          return book._id !== action.payload.bookId;
        }),
      };

    case "filterModeIsOn":
      return {
        ...state,
        filtredMode: true,
      };
    case "filterModeIsOff":
      return {
        ...state,
        filtredMode: false,
      };
    default:
      return state;
  }
};
