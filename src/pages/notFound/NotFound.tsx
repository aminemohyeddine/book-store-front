import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

var cryingBaby = require("../../assets/Crying-Baby-PNG-File.png");

const NotFound = () => {
  return (
    <Box
      h="90vh"
      w="100%"
      display="flex"
      alignItems="center"
      bg="#329793"
      flexDirection="column"
      pt="150px"
    >
      <Image width="200px" height="200px" src={cryingBaby} alt="Dan Abramov" />

      <Text color="white" fontSize="5xl">
        Oh no ! page not found
      </Text>
    </Box>
  );
};

export default NotFound;
