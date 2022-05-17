import { BooksConst } from "../../constants/booksConstants";
import { BookI } from "../../../constants/interfaces";

interface booksAction {
  type:
    | BooksConst.getAllBooks
    | BooksConst.searchBook
    | BooksConst.getBook
    | BooksConst.deleteBook
    | BooksConst.bookStateHasChanged;
  payload: any;
}

export const getBooks = (
  state = {
    booksData: [],
    filtredBooks: [],
    singleBook: {},
    bookStateHasChanged: false,
  },
  action: booksAction
) => {
  switch (action.type) {
    case BooksConst.getAllBooks:
      return { ...state, booksData: action.payload };
    case BooksConst.searchBook:
      return {
        ...state,
        filtredBooks:
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

    case "bookStateHasChanged":
      return {
        ...state,
        bookStateHasChanged: !state.bookStateHasChanged,
      };
    default:
      return state;
  }
};
