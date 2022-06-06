import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BookI } from "../../constants/interfaces";
import BookInList from "./components/BookInList";
import BooksPlans from "./components/BooksPlans";

const Home = () => {
  const booksList: any = useSelector(
    (state: RootState) => state.Books.booksData
  );

  var audioBook = require("../../assets/Gateway_Audiobooks-_2_.webp");
  var quoteBook = require("../../assets/Gateway_Quote_A4_03-29 (1).webp");

  return (
    <Box minHeight="90vh" width="100%" backgroundColor="black">
      <Box position="sticky" top="10vh" zIndex="10">
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          autoPlay={true}
          infiniteLoop={true}
        >
          <Image
            alt="image2"
            style={{ zIndex: "0" }}
            width="100%"
            height="90vh"
            src={audioBook}
          />

          <Image
            alt="image1"
            style={{ zIndex: "0" }}
            width="100%"
            height="90vh"
            src={quoteBook}
          />
        </Carousel>
      </Box>
      <Box
        minHeight="90vh"
        zIndex="80"
        position="sticky"
        backgroundColor="#B2F5EA"
        style={{
          backgroundImage: `url("https://i.ibb.co/fMm6kg1/My-project.webp")`,
        }}
        top="10vh"
      >
        {/* <Image src={Image} /> */}

        <>
          <Text
            w="100%"
            textAlign="center"
            mt="5px"
            mb="5px"
            fontSize="2xl"
            cursor="pointer"
            color="black"
            textShadow="1px 0 0 #329793, 0 -1px 0 #329793, 0 1px 0 #329793, -1px 0 0 #329793"
          >
            We Give You Access To The Most Readable Books
          </Text>
          <Box
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box flexWrap="wrap" justifyContent="center" display="flex">
              {booksList.slice(0, 8)?.map((book: any, key: any) => (
                <Box key={key}>
                  <BookInList book={book} />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      </Box>

      <BooksPlans />
    </Box>
  );
};

export default Home;
