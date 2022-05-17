import React, { useState } from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import ReviewForm from "./forms/ReviewForm";
import SuccessForm from "./forms/SuccessForm";
import ShippingForm from "./forms/shippingForm";

const CheckOutPage = () => {
  const [isLargerThan1082] = useMediaQuery("(min-width: 1082px)");
  const [step, setStep] = useState("shipping");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="89vh"
      w="100%"
    >
      <Box position="relative" minHeight="77vh" minWidth="366px" w="42%">
        <Text mb="20px" mt="20px" w="100%" textAlign="center" fontSize="3xl">
          Checkout
        </Text>
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pl="10px"
          pr="10px"
        >
          <Text
            mr="5px"
            h="20px"
            w="20px"
            borderRadius="100%"
            bg="#1a72db"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="xs"
          >
            1
          </Text>
          <Text mr={isLargerThan1082 ? "5px" : "30px"} fontSize="11px">
            Shipping Address
          </Text>
          {isLargerThan1082 && (
            <Box
              mr="5px"
              height="0.5px"
              bg="grey"
              w="10%"
              minWidth="50px"
            ></Box>
          )}

          <Text
            mr="5px"
            h="20px"
            w="20px"
            borderRadius="100%"
            bg={step === "review" || step === "success" ? "#1a72db" : "grey"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="xs"
          >
            2
          </Text>
          <Text
            color={step === "review" || step === "success" ? "black" : "grey"}
            mr={isLargerThan1082 ? "5px" : "30px"}
            fontSize="11px"
          >
            Review your order
          </Text>
          {isLargerThan1082 && (
            <Box
              mr="5px"
              height="0.5px"
              bg="grey"
              w="10%"
              minWidth="50px"
            ></Box>
          )}
          <Text
            mr="5px"
            h="20px"
            w="20px"
            borderRadius="100%"
            bg={step === "success" ? "#1a72db" : "grey"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="xs"
          >
            3
          </Text>
          <Text color={step === "success" ? "black" : "grey"} fontSize="11px">
            success
          </Text>
        </Box>

        {step === "shipping" && <ShippingForm setStep={setStep} />}
        {step === "review" && <ReviewForm setStep={setStep} />}
        {step === "success" && <SuccessForm />}

        {/* <Button
          onClick={() => {
            if (step === "shipping") {
              setStep("review");
            } else if (step === "review") {
              setStep("success");
            }
          }}
          position="absolute"
          right="10px"
          bottom="10px"
          w="100px"
        >
          {step === "shipping" || step === "review" ? "next" : "Submit"}
        </Button> */}
      </Box>
    </Box>
  );
};

export default CheckOutPage;
