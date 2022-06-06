import React from "react";
import { Box, Text, Image, Icon } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { BookI } from "../../../constants/interfaces";
import {
  deleteBook,
  bookStateHasChanged,
} from "../../../redux/actions/booksActions.ts/booksActions";
import { useDispatch } from "react-redux";
import axios from "axios";

interface Props {
  book: BookI;
}

const Book: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(bookStateHasChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      position="relative"
      mr="5px"
      w="200px"
      borderRadius="10px"
      bg="white"
      height="fit-content"
      pb="10px"
    >
      <Link to={`/admin/books/modify/${book._id}`}>
        <Image
          height="40vh"
          width="100%"
          src={book.image}
          alt="Dan Abramov"
          borderRadius="10px 10px 0px 0px"
        />
      </Link>
      <Box display="flex">
        <Box
          alignItems="center"
          justifyContent="center"
          h="5vh"
          display="flex"
          bg="red"
          w="50%"
          cursor="pointer"
          onClick={async () => {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}books/deletebookbyid?id=${book._id}`
            );
            console.log(response);

            dispatch(deleteBook(book._id));
            //

            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        >
          <Text mr="8px" color="white" fontSize="xs">
            Delete Book
          </Text>
          <Icon color="white" fontSize="xs" as={DeleteIcon} />
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          h="5vh"
          display="flex"
          bg="green"
          w="50%"
          cursor="pointer"
        >
          <a
            style={{ color: "white", fontSize: "12px", marginRight: "8px" }}
            href={`/admin/books/modify/${book._id}`}
          >
            ModifyBook
          </a>

          <Icon color="white" fontSize="xs" as={EditIcon} />
        </Box>

        {/* <Box position="relative">
        <Icon
          as={DeleteIcon}
          top="-290px"
          right="20px"
          color="yellow"
          h="20px"
          w="20px"
          cursor="pointer"
          position="absolute"
          src={cartImage}
          alt="cart image"
          onClick={async () => {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}books/deletebookbyid?id=${book._id}`
            );
            dispatch(deleteBook(book._id));
            //

            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        />
      </Box> */}
      </Box>
    </Box>
  );
};

export default Book;
