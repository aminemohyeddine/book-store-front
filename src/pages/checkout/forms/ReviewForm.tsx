import React, { useMemo } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axios from "axios";
import Cookies from "universal-cookie";
import { BookI } from "../../../constants/interfaces";
interface Props {
  setStep: any;
}

const ReviewForm: React.FC<Props> = ({ setStep }) => {
  const cookies = new Cookies();

  const userToken = cookies.get("userToken");
  const [total, setTotal] = React.useState<number>(0);

  const cartState: any = useSelector((state: RootState) => state.cart);
  const cart: BookI[] = cartState.cart;

  const checkoutDetails: any = useSelector(
    (state: RootState) => state.checkout
  );
  const details: any = checkoutDetails.checkoutDetails;
  const shippingDetails: any = details[0].adress;

  const totalCount = () => {
    console.log("total changed");

    let totalPrice: number = 0;
    cart.forEach((book: BookI) => {
      totalPrice = totalPrice + book.price;
    });
    setTotal(totalPrice);
  };

  useMemo(() => {
    totalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const fetchOrder = async () => {
    const cartNames = cart.map((book: BookI, index: number) => {
      return book.name;
    });

    const userFullAddress =
      "adress : " +
      shippingDetails.address +
      " ," +
      "city : " +
      shippingDetails.city +
      " ," +
      "zip : " +
      shippingDetails.zipCode +
      " ," +
      "country : " +
      shippingDetails.selectedCountry;

    const userCompleteName =
      shippingDetails.firstName + " " + shippingDetails.lastName;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}orders/add`,
        {
          token: userToken,
          total: total.toFixed(2),
          address: userFullAddress,
          email: shippingDetails.email,
          currency: "$",
          userCompleteName: userCompleteName,
          phoneNumber: shippingDetails.phoneNumber,
          books: cartNames,
        }
      );
      if (response.statusText === "Created") {
        setStep("success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box position="relative" mt="20px" minHeight="60vh" p="20px">
      <Text fontSize="xl">Order summary</Text>
      <Box mt="30px">
        {cart?.map((book: BookI, key: number) => (
          <Box
            mb="20px"
            w="100%"
            display="flex"
            justifyContent="space-between"
            key={key}
          >
            <Text fontSize="sm" w="200px">
              {book.name}
            </Text>
            <Text>
              {book.price.toFixed(2)} {book.currency}{" "}
            </Text>
          </Box>
        ))}
        <Box mb="20px" w="100%" display="flex" justifyContent="space-between">
          <Text fontSize="s">Total</Text>
          <Text fontSize="s">{total.toFixed(2)}$</Text>
        </Box>
      </Box>
      <Text fontSize="xl" w="">
        Shipping
      </Text>
      <Box mt="20px">
        <Text fontSize="xs">
          {shippingDetails.address} , {shippingDetails.zipCode},{" "}
          {shippingDetails.city}, {shippingDetails.selectedCountry}
        </Text>
        <Text mt="10px" fontSize="xs">
          {shippingDetails.phoneNumber}
        </Text>
        <Text mt="10px" fontSize="xs">
          {shippingDetails.email}
        </Text>
      </Box>
      <Button
        position="absolute"
        right="10px"
        bottom="20px"
        onClick={() => {
          fetchOrder();
        }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default ReviewForm;
