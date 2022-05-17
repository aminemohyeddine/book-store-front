import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BookI } from "../../constants/interfaces";
import { Box, Spinner } from "@chakra-ui/react";
import Book from "./Book";
import { RootState } from "../../redux/store";
import "react-multi-carousel/lib/styles.css";
import "./booksPage.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {}

const Books: React.FC<Props> = () => {
  const bookState: any = useSelector((state: RootState) => state.Books);
  const books: BookI[] = bookState.booksData;
  const [filtredData, setFiltredData] = React.useState<BookI[]>([]);

  const fetchMoreData = () => {
    if (books.length >= filtredData.length) {
      setTimeout(() => {
        setFiltredData(books.slice(0, filtredData.length + 5));
      }, 500);
    }
  };

  const initialize = async () => {
    setFiltredData(books.slice(0, 14));
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  // useEffect(() => {
  //   loginStatus = cookies.get("login");
  // }, [loginStatus]); //eslint-disable-line

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
        <Box bg="#ffffff" p="50px" w="100%" minHeight="90vh">
          <InfiniteScroll
            dataLength={filtredData.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
              <>
                {books.length !== filtredData.length && (
                  <h4 style={{ position: "absolute", bottom: "0px" }}>
                    Loading...
                  </h4>
                )}
              </>
            }
            className="amine"
          >
            {filtredData.map((book: BookI, index: number) => (
              <Box h="auto" mr="30px" w="200px" p="6px" key={index}>
                <Book book={book} />
              </Box>
            ))}
          </InfiniteScroll>
        </Box>
      )}
    </>
  );
};

export default Books;
