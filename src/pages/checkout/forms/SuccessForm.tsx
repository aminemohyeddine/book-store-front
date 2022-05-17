import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import { deleteAllBooksFromCart } from "../../../redux/actions/cartActions/cartActions";
import { useDispatch } from "react-redux";

const SuccessForm = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const redirect = () => {
    setTimeout(function () {
      window.location.href = "/";
    }, 5000);
  };

  React.useEffect(() => {
    cookies.set("cart", [], { path: "/" });
    dispatch(deleteAllBooksFromCart());
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
      mt="20px"
      minHeight="60vh"
      p="20px"
    >
      <Text mb="50px" fontSize="2xl">
        Thank you for your order.
      </Text>
      <Text>
        we will call as soon as possible to confirm the order , you will be
        redirected to the home page after 5 sec.
      </Text>
    </Box>
  );
};

export default SuccessForm;
