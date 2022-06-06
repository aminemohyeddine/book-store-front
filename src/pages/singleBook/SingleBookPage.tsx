import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useMediaQuery,
  Center,
  Divider,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BookI } from "../../constants/interfaces";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../redux/actions/booksActions.ts/booksActions";
import "./singleBookPage.css";
import { addBookToCart } from "../../redux/actions/cartActions/cartActions";

import { RootState } from "../../redux/store";

interface Props {}

const SingleBook: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const starsLimit = 5;

  const [loading, setLoading] = useState<boolean>(true);

  const books: any = useSelector((state: RootState) => state.Books.booksData);

  const book: any = useSelector((state: RootState) => state.Books.singleBook);

  const [isLargerThan868] = useMediaQuery("(min-width: 1055px)");

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  useEffect(() => {
    if (books.length === 0) {
    } else {
      dispatch(getBook(bookId));
      setLoading(false);
    }
  }, [books, bookId, dispatch]);

  return (
    <>
      {loading ? (
        <Box
          color="white"
          bg="#ffffff"
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
          pl={isLargerThan868 ? "200px" : "0px"}
          pt={isLargerThan868 ? "100px" : "20px"}
          pb="30px"
          bg="#ffffff"
          display="flex"
          width="100%"
          minHeight="90vh"
          flexDirection={isLargerThan868 ? "row" : "column"}
        >
          <Box
            mr="30px"
            h="auto"
            w={isLargerThan868 ? "300px" : "100%"}
            display={isLargerThan868 ? "" : "flex"}
            flexDirection={isLargerThan868 ? "row" : "column"}
            alignItems={isLargerThan868 ? "" : "center"}
          >
            <Box width="300px" position="relative">
              <img
                alt="image2"
                height="300px"
                width="300px"
                src={book[0].image}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={!isLargerThan868 ? "center" : ""}
            justifyContent={!isLargerThan868 ? "center" : ""}
          >
            <Text
              w="80%"
              mt={isLargerThan500 ? "10px" : "30px"}
              cursor="pointer"
              fontSize={isLargerThan868 ? "32px" : "20px"}
              fontFamily="GT Super Bold, serif"
              letterSpacing="1.5px"
              fontWeight="bold"
              textAlign={isLargerThan868 ? "left" : "center"}
            >
              {book[0].name}
            </Text>
            <Box mt="20px" display="flex">
              <Text
                _hover={{ color: "#2e9894" }}
                cursor="pointer"
                fontSize="1xl"
              >
                {book[0].category} (category)
              </Text>
              <Center mt="8px" mr="10px" ml="10px" height="14px">
                <Divider bg="#2e9894" orientation="vertical" />
              </Center>
              <Text
                _hover={{ color: "#2e9894" }}
                cursor="pointer"
                fontSize="1xl"
                // color=""
              >
                {book[0].author} (Author)
              </Text>
            </Box>
            <Box display="flex" mt="7px">
              {[...Array(starsLimit)].map((elementInArray, index) => (
                <Box key={index}>
                  {index + 1 < book[0].rating ? (
                    <>
                      <StarIcon key={index} color="yellow" />
                    </>
                  ) : (
                    <>
                      <StarIcon key={index} color="#e8e8e8" />
                    </>
                  )}
                </Box>
              ))}
            </Box>
            <Text
              minWidth={isLargerThan868 ? "500px" : "300px"}
              mt="20px"
              w="70%"
              fontSize="1xl"
              dangerouslySetInnerHTML={{
                __html: book[0].description.split(". ").join(". <br />"),
              }}
            >
              {/* {book[0].description.split(".").join("<br />")} */}
            </Text>
            <Box display="flex" mt="20px" w="70%" fontSize="1xl">
              <Text>Language</Text>
              {book[0].language === "English" ? (
                <Image
                  ml="20px"
                  cursor="pointer"
                  height="30px"
                  width="20px"
                  src={
                    "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                  }
                  alt="Dan Abramov"
                />
              ) : (
                <Text>{book[0].language}</Text>
              )}
            </Box>

            <Text mt="20px" w="70%" fontSize="1xl">
              {book[0].pagesNumber} page
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              w="80%"
              // pl="120px"
              mt="50px"
              alignItems="center"
              // bg="green"
            >
              <Text
                bg="pink"
                borderRadius="50px"
                p="5px"
                fontSize={isLargerThan500 ? "2xl" : "lg"}
              >
                {book[0].price} {book[0].currency}
              </Text>
              <button
                onClick={() => {
                  dispatch(addBookToCart(book[0]._id, books));
                }}
                className="cta"
              >
                <span>Add To Cart</span>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleBook;
