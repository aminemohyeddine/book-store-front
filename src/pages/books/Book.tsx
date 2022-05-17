import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { BookI } from "../../constants/interfaces";
import { addBookToCart } from "../../redux/actions/cartActions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

var cartImage = require("../../assets/istockphoto-1206806317-612x612.jpg");

interface Props {
  book: BookI;
}

const Book: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();

  const booksState: any = useSelector((state: RootState) => state.Books);
  const allBooks: BookI[] = booksState.booksData;

  const starsLimit = 5;
  const link = "/book/" + book._id;
  return (
    <Box
      position="relative"
      mr="50px"
      w="180px"
      borderRadius="10px"
      bg="white"
      minHeight="340px"
      pb="10px"
      mb="30px"
      cursor="pointer"
      boxShadow="3px 3px 3px 3px #bfbfbf"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Link to={link}>
        <Image
          height="35vh"
          width="100%"
          src={book.image}
          alt="Dan Abramov"
          borderRadius="10px 10px 0px 0px"
        />
      </Link>

      <Box mt="10px" display="flex" pl="10px" pr="10px">
        {[...Array(starsLimit)].map((elementInArray, index) => (
          <Box key={index}>
            {index < book.rating ? (
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
      <Box mt="10px" alignItems="center" display="flex" pl="10px" pr="10px">
        <Text fontSize="sm" fontWeight="bold">
          {book.price}
          {book.currency} {"   "}
        </Text>
        <Text
          fontWeight="bold"
          textDecoration="line-through"
          fontSize="xs"
          color="red"
          verticalAlign="middle"
        >
          {"   "} / {"   "}
          {book.price.toFixed(1) + 8}
          {book.currency}
        </Text>
        &nbsp; &nbsp;
        <Image
          style={{ cursor: "pointer" }}
          height="22px"
          width="17px"
          src={
            "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
          }
          alt="Dan Abramov"
        />
      </Box>

      <Box position="relative">
        <Image
          bottom="0px"
          right="5px"
          h="30px"
          w="30px"
          cursor="pointer"
          position="absolute"
          src={cartImage}
          alt="cart image"
          onClick={() => {
            dispatch(addBookToCart(book._id, allBooks));
            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        />
      </Box>
    </Box>
  );
};

export default Book;
