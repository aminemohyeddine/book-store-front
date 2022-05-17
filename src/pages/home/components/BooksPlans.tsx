import React from "react";
import { Box, Text, Button, useMediaQuery } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, UnlockIcon } from "@chakra-ui/icons";
import Carousel from "react-multi-carousel";
import "./BooksPlans.css";
import "react-multi-carousel/lib/styles.css";

const BooksPlans = () => {
  const [isLargerThan878] = useMediaQuery("(min-width: 898px)");
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  const plans = [
    {
      hoverTitle: "use this coupon to get 30% off BT857478",
      name: "Limited Subscription",
      price: "15",
      oldPrice: "20",
      currency: "£",
      access: [
        { name: "You Have Access To 50 Book", isValid: true },
        {
          name: "You Can Download 25 Book And Others Will Be Online",
          isValid: true,
        },
        { name: "You Can't Get Mail Updates Of Our Books", isValid: false },
      ],
    },
    {
      hoverTitle: "use this coupon to get 30% off BT747854",
      name: "Medium Subscription",
      price: "25",
      oldPrice: "30",
      currency: "£",
      access: [
        { name: "You Have Access To 100 Book", isValid: true },
        {
          name: "You Can Download 50 Book And Others Will Be Online",
          isValid: true,
        },
        { name: "You Can Get Mail Updates Of Our Books", isValid: true },
        { name: "You Can't Get Books After 100 Book", isValid: false },
      ],
    },
    {
      hoverTitle: "use this coupon to get 30% off BT14514",
      name: "Unlimited Subscription",
      price: "35",
      oldPrice: "40",
      currency: "£",
      access: [
        { name: "You Have Access To All Books", isValid: true },
        {
          name: "You Can Download All Books Available",
          isValid: true,
        },
        { name: "You Can Get Mail Updates Of Our Books", isValid: true },
      ],
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1120, min: 464 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 870, min: 625 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };
  return (
    <Box
      minHeight="90vh"
      position="sticky"
      zIndex="90"
      top="11vh"
      w="100%"
      bg="#90edb3"
      pb="20px"
      style={{
        backgroundImage: `url("https://i.ibb.co/5GYc72x/My-project-1-1.webp")`,
      }}
    >
      <Text
        color="white"
        textShadow="1px 0 0 #329793, 0 -1px 0 #329793, 0 1px 0 #329793, -1px 0 0 #329793"
        pt="40px"
        mb="30px"
        fontSize="4xl"
        width="100%"
        textAlign="center"
      >
        Our Plans
      </Text>

      {/*  */}
      {isLargerThan878 ? (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {plans.map((plan, key) => (
            <Box
              position="relative"
              key={key}
              width="400px"
              ml="20px"
              mr="20px"
              height="70vh"
              border="1px solid #319693"
              bg={
                key === 0
                  ? "linear-gradient(45deg, #9be6ff 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #ffd6ff 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #a0c4ff 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #ffffbc 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
                  : key === 1
                  ? "linear-gradient(45deg, #ffd6fe 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #e7c6fe 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #c8b6fe 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #b8c0fe 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
                  : "linear-gradient(45deg, #e4c1f8 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #fcf6be 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #90e0ee 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #a9ded9 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
              }
              mt="20px"
            >
              <Text
                mt="30px"
                mb="30px"
                fontSize="2xl"
                width="100%"
                textAlign="center"
                color="black"
                _hover={{
                  color: "#329793",
                  cursor: "pointer",
                }}
              >
                {plan.name}
              </Text>
              <Box mt="30px" p="10px">
                {plan.access.map((access, key) => (
                  <Box key={key} display="flex" justifyContent="center">
                    {access.isValid ? (
                      <CheckIcon
                        color="#34eb77"
                        mt="3px"
                        mr="10px"
                        w={4}
                        h={4}
                      />
                    ) : (
                      <CloseIcon
                        color="#f75959"
                        mt="3px"
                        mr="10px"
                        w={4}
                        h={4}
                      />
                    )}

                    <Text
                      textDecoration={!access.isValid ? "line-through" : ""}
                      color={access.isValid ? "#00c22a" : "#f75959"}
                      textAlign="center"
                      mb="50px"
                    >
                      {access.name}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box display="flex" justifyContent="center">
                <Box position="absolute" bottom="20px">
                  <Button
                    leftIcon={<UnlockIcon />}
                    colorScheme="pink"
                    variant="solid"
                  >
                    <Text mr="5px" color="#00c22a" mt="3px">
                      {plan.price}
                      {plan.currency}
                    </Text>{" "}
                    /
                    <Text ml="5px" textDecoration="line-through">
                      {plan.oldPrice}
                      {plan.currency}
                    </Text>
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box w="100%">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            // centerMode={true}
          >
            {plans.map((plan, key) => (
              <Box
                position="relative"
                key={key}
                width={isLargerThan450 ? "300px" : "250px"}
                height={isLargerThan450 ? "70vh" : "55vh"}
                border="1px solid #319693"
                bg={
                  key === 0
                    ? "linear-gradient(45deg, #9be6ff 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #ffd6ff 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #a0c4ff 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #ffffbc 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
                    : key === 1
                    ? "linear-gradient(45deg, #ffd6fe 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #e7c6fe 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #c8b6fe 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #b8c0fe 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
                    : "linear-gradient(45deg, #e4c1f8 0%, rgba(225, 5, 34, 0) 70%) repeat scroll 0% 0%, linear-gradient(135deg, #fcf6be 10%, rgba(49, 5, 209, 0) 80%) repeat scroll 0% 0%, linear-gradient(225deg, #90e0ee 10%, rgba(10, 219, 216, 0) 80%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(315deg, #a9ded9 100%, rgba(9, 245, 5, 0) 70%) repeat scroll 0% 0%"
                }
                mt="20px"
                // ml="auto"
                // mr="auto"
              >
                <Text
                  mt="15px"
                  mb="15px"
                  fontSize={isLargerThan450 ? "2xl" : "1xl"}
                  width="100%"
                  textAlign="center"
                  color="black"
                  _hover={{
                    color: "#329793",
                    cursor: "pointer",
                  }}
                >
                  {plan.name}
                </Text>
                <Box mt="30px" p="10px">
                  {plan.access.map((access, key) => (
                    <Box key={key} display="flex" justifyContent="center">
                      {access.isValid ? (
                        <CheckIcon
                          color="#34eb77"
                          mt="3px"
                          mr="10px"
                          w={4}
                          h={4}
                        />
                      ) : (
                        <CloseIcon
                          color="#f75959"
                          mt="3px"
                          mr="10px"
                          w={4}
                          h={4}
                        />
                      )}

                      <Text
                        textDecoration={!access.isValid ? "line-through" : ""}
                        color={access.isValid ? "#00c22a" : "#f75959"}
                        textAlign="center"
                        mb="50px"
                        fontSize={isLargerThan450 ? "1xl" : "sm"}
                      >
                        {access.name}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Box display="flex" justifyContent="center">
                  <Box position="absolute" bottom="20px">
                    <Button
                      leftIcon={<UnlockIcon />}
                      colorScheme="pink"
                      variant="solid"
                    >
                      <Text mr="5px" color="#00c22a" mt="3px">
                        {plan.price}
                        {plan.currency}
                      </Text>{" "}
                      /
                      <Text ml="5px" textDecoration="line-through">
                        {plan.oldPrice}
                        {plan.currency}
                      </Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      )}

      {/* </Box> */}
    </Box>
  );
};

export default BooksPlans;
