import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Book from "./model/Book";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BookI } from "../../constants/interfaces";
import Cookies from "universal-cookie";

const ListBooksAdmin = () => {
  const cookies = new Cookies();
  const loginMode = cookies.get("loginMode");
  const books: any = useSelector((state: RootState) => state.Books.booksData);

  return (
    <>
      {loginMode === "admin" ? (
        <Box minHeight="90vh" w="100%">
          <Box pl="40px" pr="40px" display="flex" flexWrap="wrap">
            {books.map((book: BookI, key: number) => (
              <Box key={key} h="">
                <Book book={book} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="90vh"
          w="100%"
        >
          <Text>login as admin first</Text>
        </Box>
      )}
    </>
  );
};

export default ListBooksAdmin;
