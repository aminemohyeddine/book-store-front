import React, { memo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { changeCartState } from "../../../redux/actions/cartActions/cartActions";
import CartList from "./cartList";
import Cookies from "universal-cookie";
import { BookI } from "../../../constants/interfaces";

var cartImage = require("../../../assets/istockphoto-1206806317-612x612.jpg");
const areEqual = (prevProps: any, nextProps: any) => false;

const CartComponent = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const cart: any = useSelector((state: RootState) => state.cart.cart);
  const isCart: boolean = useSelector(
    (state: RootState) => state.cart.cartState
  );

  const books: any = useSelector((state: RootState) => state.Books.booksData);

  React.useMemo(() => {
    console.log("cart changed");

    if (cart.length > 0) {
      console.log("more");
      const realCart = JSON.stringify(cart);
      localStorage.setItem("cart", realCart);
    }

    if (cart.length === 0 && books.length > 0) {
      localStorage.setItem("cart", "");
    }
  }, [cart]);

  return (
    <Box bg="blue" mr="20px" position="relative">
      <Image
        cursor="pointer"
        onClick={() => {
          dispatch(changeCartState(!isCart));
        }}
        src={cartImage}
        w="50px"
        h="40px"
      />
      <Box
        borderRadius="100%"
        bg="red"
        h="15px"
        w="15px"
        right="0px"
        top="0px"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize="xs"
      >
        <Text>{cart.length}</Text>
        {isCart && <CartList cartBooks={cart} />}
      </Box>
    </Box>
  );
};

export default memo(CartComponent);
