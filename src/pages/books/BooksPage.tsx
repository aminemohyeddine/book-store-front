import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BookI } from "../../constants/interfaces";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { RootState } from "../../redux/store";
import "react-multi-carousel/lib/styles.css";
import "./booksPage.css";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterBooksSection from "./FilterBooksSection";
import ReactPaginate from "react-paginate";
import Book from "./Book";
import "./booksPage.css";
import {
  filterModeIsOff,
  filterBooks,
} from "../../redux/actions/booksActions.ts/booksActions";
interface Props {}

function Items(currentItems: any) {
  return (
    <>
      {currentItems &&
        currentItems.currentItems?.map((item: any, key: number) => (
          <Box h="400px" mr="30px" w="200px" p="6px" key={key}>
            <Book book={item} />
          </Box>
        ))}
    </>
  );
}

const Books: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const books: any = useSelector((state: RootState) => state.Books.booksData);

  const filtredBooks: any = useSelector(
    (state: RootState) => state.Books.filtredBooks
  );

  const filtreMode: any = useSelector(
    (state: RootState) => state.Books.filtredMode
  );

  const [filtredData, setFiltredData] = React.useState<BookI[]>([]);
  //pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 10;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(books.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(books.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, books]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(books.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(books.length / itemsPerPage));

    return () => {
      dispatch(filterModeIsOff());
      dispatch(filterBooks([]));
    };
  }, []);

  useEffect(() => {
    if (filtreMode === true && filtredBooks.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filtredBooks.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filtredBooks.length / itemsPerPage));
    } else {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(books.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(books.length / itemsPerPage));
    }

    // Fetch items from another resources.
  }, [filtreMode, filtredBooks]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % books.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      {books.length === 0 ? (
        <Box
          color="white"
          bg="#bee2f8"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="90vh"
          w="100%"
        >
          <Spinner
            color="#329693"
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </Box>
      ) : (
        <Box
          bg="#ffffff"
          pl="50px"
          pr="50px"
          pb="50px"
          w="100%"
          minHeight="90vh"
        >
          {/* <FilterBooksSection /> */}

          {filtreMode && filtredBooks.length === 0 && (
            <>
              {" "}
              <Text w="100%" textAlign="center">
                no data available
              </Text>
            </>
          )}

          {filtreMode && filtredBooks.length > 0 && (
            <>
              <Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  <Items currentItems={currentItems} />
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    // renderOnZeroPageCount={null}
                  />
                </Box>
              </Box>
            </>
          )}

          {!filtreMode && (
            <>
              <Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  <Items currentItems={currentItems} />
                </Box>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    // renderOnZeroPageCount={null}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default React.memo(Books);
