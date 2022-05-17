import React from "react";
import { Box, Text, useMediaQuery, Image } from "@chakra-ui/react";
import { BookI } from "../../../constants/interfaces";
import { Link } from "react-router-dom";

interface Props {
  book: BookI;
}
const BookInList: React.FC<Props> = ({ book }) => {
  const [isLargerThan828] = useMediaQuery("(min-width: 828px)");
  const [isLargerThan470] = useMediaQuery("(min-width: 470px)");

  return (
    <Link to="/books">
      <Box
        mt="10px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mr="20px"
        borderRadius="100%"
        height={isLargerThan828 ? "250px" : isLargerThan470 ? "200px" : "150px"}
        w={isLargerThan828 ? "250px" : isLargerThan470 ? "200px" : "150px"}
        bg="#329793"
      >
        <Image
          style={{ borderRadius: "100%" }}
          height={
            isLargerThan828 ? "170px" : isLargerThan470 ? "120px" : "80px"
          }
          width={isLargerThan828 ? "170px" : isLargerThan470 ? "120px" : "80px"}
          src={book.image}
          alt="book"
        />
        <Text
          _hover={{ color: "#bee2f8" }}
          color="white"
          cursor="pointer"
          mt="10px"
          bg="transparent"
        >
          {book.name.substring(0, 16)}
        </Text>
      </Box>
    </Link>
  );
};

export default BookInList;
