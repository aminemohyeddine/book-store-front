import React from "react";
import { BookI } from "../../../constants/interfaces";
import { Box, Text, useMediaQuery, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  book: BookI;
}

const SearchBookComponent: React.FC<Props> = ({ book }) => {
  const [isLargerThan810] = useMediaQuery("(min-width: 810px)");
  const [isLargerThan670] = useMediaQuery("(min-width: 670px)");

  const link = "/book/" + book._id;
  return (
    <Link to={link}>
      <Box
        _hover={{
          bg: "#329793",
          color: "white",
        }}
        cursor="pointer"
        display="flex"
        borderBottom="solid 1px #329793"
        height={!isLargerThan670 ? "60px" : "60px"}
        bg="white"
      >
        <Image height="100%" width="50px" src={book.image} alt={book.name} />
        <Box pl="10px">
          <Text fontSize={isLargerThan810 ? "15px" : "14px"}>
            {book.name.substring(0, 30)}
          </Text>
          <Text fontSize="small">{book.author}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default SearchBookComponent;
