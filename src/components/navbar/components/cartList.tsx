import React, { useState, useEffect } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BookI } from "../../../constants/interfaces";
import {
  DeleteBookFromCart,
  deleteAllBooksFromCart,
} from "../../../redux/actions/cartActions/cartActions";

interface Props {
  cartBooks: any;
  setIsCart: any;
}
const CartList: React.FC<Props> = ({ cartBooks, setIsCart }) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState<number>(0);
  const totalCount = () => {
    let totalPrice = 0;
    cartBooks.forEach((book: BookI) => {
      totalPrice = totalPrice + book.price;
    });
    setTotal(totalPrice);
  };
  useEffect(() => {
    totalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartBooks]);

  return (
    <Box
      bg="white"
      border="3px solid #329793"
      position="absolute"
      top="7vh"
      h="400px"
      w="400px"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
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
      {cartBooks.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          h="390px"
          w="100%"
        >
          <Text
            cursor="pointer"
            fontWeight="bold"
            fontSize="20px"
            color="black"
          >
            cart empty
          </Text>
          <Link to="/books">
            <Text
              _hover={{
                color: "red",
              }}
              fontWeight="bold"
              fontSize="20px"
              color="black"
              onClick={() => {
                setIsCart(false);
              }}
            >
              Shop
            </Text>
          </Link>
        </Box>
      ) : (
        <>
          <Box w="100%" mt="10px">
            <Box
              w="90%"
              display="flex"
              ml="5%"
              mr="5%"
              justifyContent="space-between"
              mb="15px"
            >
              <Text fontWeight="bold" fontSize="14px" color="#999999">
                Shopping Cart
              </Text>
              <Text
                onClick={() => {
                  dispatch(deleteAllBooksFromCart());
                  setIsCart(false);
                }}
                cursor="pointer"
                textDecoration="underline"
                color="#ff9b21"
              >
                Remove All
              </Text>
            </Box>
            {cartBooks?.map((cartBook: BookI, key: number) => (
              <Box
                key={key}
                display="flex"
                height="100px"
                w="100%"
                position="relative"
                justifyContent="space-between"
                borderRadius="10px"
                marginBottom="10px"
                pr="20px"
                pl="10px"
              >
                <Image src={cartBook.image} h="100%" w="70px" />
                <Box w="200px">
                  <Text
                    fontSize="15px"
                    fontWeight="bold"
                    mb="1px"
                    color="#000000"
                    mt="10px"
                    cursor="pointer"
                  >
                    {cartBook.name.substring(0, 25)}
                  </Text>
                  <Text mb="3px" color="#bfbfbf">
                    {cartBook.author}
                  </Text>
                  <Text color="#000000">{cartBook.category}</Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="15px"
                    textAlign="center"
                    mt="10px"
                    color="#000000"
                  >
                    $ {cartBook.price.toFixed(2)}
                  </Text>
                  <Link to={`/book/${cartBook._id}`}>
                    <Text
                      fontWeight="bold"
                      fontSize="12px"
                      textAlign="center"
                      textDecoration="underline"
                      color="#16a9f7"
                      cursor="pointer"
                      onClick={() => {
                        setIsCart(false);
                      }}
                    >
                      Details
                    </Text>
                  </Link>
                  <Text
                    textAlign="center"
                    textDecoration="underline"
                    color="#ff9b21"
                    cursor="pointer"
                    onClick={() => {
                      dispatch(DeleteBookFromCart(cartBook._id));
                    }}
                  >
                    remove
                  </Text>
                </Box>
              </Box>
            ))}

            <Box
              display="flex"
              borderTop="1px solid black"
              height="100px"
              w="310px"
              ml="80px"
              alignItems="flex-end"
              color="red"
              flexDirection="column"
            >
              <Box w="50%" display="flex" justifyContent="space-between">
                <Box mt="15px" display="flex" flexDirection="column">
                  <Text fontWeight="bold" fontSize="13px" color="black">
                    Sub-Total
                  </Text>
                  <Text fontSize="10px" color="#c2c2c2">
                    {cartBooks.length} Items
                  </Text>
                </Box>
                <Box mt="17px" mr="20px">
                  <Text fontSize="17px" fontWeight="bold" color="black">
                    ${total.toFixed(2)}
                  </Text>
                </Box>
              </Box>
              <Link to={"/checkout"}>
                <Button
                  onClick={() => {
                    setIsCart(false);
                  }}
                  color="black"
                  w="160px"
                >
                  checkout
                </Button>
              </Link>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartList;
