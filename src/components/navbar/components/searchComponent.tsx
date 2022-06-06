import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Box,
  Text,
  Input,
  useMediaQuery,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import Cookies from "universal-cookie";
import SearchBookComponent from "./searchBook";
import { RootState } from "../../../redux/store";

import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { searchBook } from "../../../redux/actions/booksActions.ts/booksActions";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [searchedBook, setSearchedBook] = useState("");
  const [isLargerThan930] = useMediaQuery("(min-width:1026px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 879px)");
  const loginModeCookie = cookies.get("loginMode");

  const allBooks: any = useSelector(
    (state: RootState) => state.Books.booksData
  );

  const filteredBooks: any = useSelector(
    (state: RootState) => state.Books.filtredBooksBysearch
  );

  const userLoggedIn: boolean = useSelector(
    (state: RootState) => state.loginStates.userLoggedIn
  );

  const changeSearchBooks = (event: any) => {
    setSearchedBook(event.target.value);
  };

  React.useMemo(() => {
    dispatch(searchBook(allBooks, searchedBook));
  }, [searchedBook]); //eslint-disable-line

  useEffect(() => {
    if (searchedBook !== "") {
      dispatch(searchBook([], ""));
      setSearchedBook("");
    }
  }, [isLargerThan800]); //eslint-disable-line

  return (
    <>
      {loginModeCookie !== "admin" && (
        <Box position="relative">
          <InputGroup
            display={!isLargerThan800 ? "none" : "block"}
            w={isLargerThan930 ? "400px" : "300px"}
          >
            <InputLeftElement
              pointerEvents="none"
              children={
                <>
                  <Search2Icon color="#bce0f6" />
                </>
              }
            />
            {/* _hover={{ color: "#329793" }} */}

            <Input
              borderColor="#bce0f6"
              w={isLargerThan930 ? "400px" : "300px"}
              type="tel"
              placeholder="Find A Book"
              color="#329793"
              onChange={changeSearchBooks}
              isDisabled={false}
              value={searchedBook}
            />
            {userLoggedIn && (
              <InputRightElement
                children={
                  <CloseIcon
                    onClick={() => {
                      setSearchedBook("");
                    }}
                    cursor="pointer"
                    color="#bce0f6"
                  />
                }
              />
            )}
          </InputGroup>
          {/* //input search div */}
          {filteredBooks.length > 0 && isLargerThan800 && (
            <Box
              zIndex="1000"
              top="42x"
              bg="#329793"
              position="absolute"
              w={isLargerThan930 ? "400px" : "300px"}
              maxHeight="400px"
              overflowY="scroll"
              borderRadius="10px 0px 0px 10px"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                  background: "white",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#329793",
                  borderRadius: "24px",
                },
              }}
            >
              {filteredBooks?.map((book: any, index: any) => (
                <Box
                  key={index}
                  onClick={() => {
                    setSearchedBook("");
                  }}
                >
                  <SearchBookComponent book={book} />
                </Box>
              ))}
            </Box>
          )}

          {filteredBooks.length === 0 &&
            isLargerThan800 &&
            searchedBook.length > 0 && (
              <Box
                zIndex="1000"
                top="42x"
                bg="white"
                position="absolute"
                w={isLargerThan930 ? "400px" : "300px"}
                height="200px"
                overflowY="scroll"
                borderRadius="10px 0px 0px 10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid #329793"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                    background: "white",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#329793",
                    borderRadius: "24px",
                  },
                }}
              >
                <Text>No Book Found</Text>
              </Box>
            )}
        </Box>
      )}
    </>
  );
};

export default SearchComponent;
