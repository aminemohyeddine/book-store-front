import React, { useState, useEffect } from "react";
import { BookI } from "../../constants/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

import {
  Box,
  Spinner,
  Text,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { RootState } from "../../redux/store";
import {
  filterBooks,
  filterModeIsOn,
  filterModeIsOff,
} from "../../redux/actions/booksActions.ts/booksActions";

const FilterBooksSection = () => {
  const dispatch = useDispatch();
  const [isLargerThan500px] = useMediaQuery("(min-width: 500px)");

  const books: any = useSelector((state: RootState) => state.Books.booksData);

  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [displayFilterSection, setDisplayFiltreSection] =
    useState<boolean>(false);

  const [filtredValues, setFiltredValues] = useState({
    author: "",
    category: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const getAvailableCategories = () => {
    let authorsList: any = [];
    let categoriesList: any = [];

    books.forEach((book: BookI) => {
      authorsList = [...authorsList, book.author];
      categoriesList = [...categoriesList, book.category];
    });

    const sortedAuthors = authorsList.sort(
      (a: any, b: any) => a.localeCompare(b) //using String.prototype.localCompare()
    );

    const sortedCategories = categoriesList.sort(
      (a: any, b: any) => a.localeCompare(b) //using String.prototype.localCompare()
    );

    const uniqueAuthors: any = Array.from(new Set(sortedAuthors));
    const uniqueCat: any = Array.from(new Set(sortedCategories));

    setAuthors(uniqueAuthors);
    setCategories(uniqueCat);
  };

  const filterBooksFunc = () => {
    if (
      filtredValues.minPrice === 0 &&
      filtredValues.maxPrice === 0 &&
      filtredValues.category === "" &&
      filtredValues.author === ""
    ) {
      dispatch(filterModeIsOff());

      setErrorMessage("try to add values first");
    } else if (
      (filtredValues.minPrice !== 0 && filtredValues.maxPrice === 0) ||
      (filtredValues.minPrice === 0 && filtredValues.maxPrice !== 0)
    ) {
      dispatch(filterModeIsOff());
      setErrorMessage("try to add values first");
    } else if (
      filtredValues.minPrice !== 0 &&
      filtredValues.maxPrice !== 0 &&
      filtredValues.minPrice > filtredValues.maxPrice
    ) {
      setErrorMessage("min price must be less than max price");
    } else if (
      filtredValues.minPrice !== 0 &&
      filtredValues.maxPrice !== 0 &&
      filtredValues.category.length === 0 &&
      filtredValues.author.length > 0
    ) {
      setErrorMessage("");
      const filtredBooks: BookI[] = books.filter(
        (book: any) =>
          book.price >= filtredValues.minPrice &&
          book.price <= filtredValues.maxPrice &&
          filtredValues.author === book.author
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice === 0 &&
      filtredValues.maxPrice === 0 &&
      filtredValues.category.length > 0 &&
      filtredValues.author.length === 0
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) => book.category === filtredValues.category
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice === 0 &&
      filtredValues.maxPrice === 0 &&
      filtredValues.category === "" &&
      filtredValues.author !== ""
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) => book.author === filtredValues.author
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice === 0 &&
      filtredValues.maxPrice === 0 &&
      filtredValues.category !== "" &&
      filtredValues.author !== ""
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) =>
          book.category === filtredValues.category &&
          book.author === filtredValues.author
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice !== 0 &&
      filtredValues.maxPrice !== 0 &&
      filtredValues.category !== "" &&
      filtredValues.author !== ""
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) =>
          book.category === filtredValues.category &&
          book.author === filtredValues.author &&
          book.price >= filtredValues.minPrice &&
          book.price <= filtredValues.maxPrice
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice !== 0 &&
      filtredValues.maxPrice !== 0 &&
      filtredValues.category.length > 0 &&
      filtredValues.author.length === 0
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) =>
          book.price >= filtredValues.minPrice &&
          book.price <= filtredValues.maxPrice &&
          filtredValues.category === book.category
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else if (
      filtredValues.minPrice !== 0 &&
      filtredValues.maxPrice !== 0 &&
      filtredValues.category.length === 0 &&
      filtredValues.category.length === 0
    ) {
      setErrorMessage("");

      const filtredBooks: BookI[] = books.filter(
        (book: any) =>
          book.price >= filtredValues.minPrice &&
          book.price <= filtredValues.maxPrice
      );
      dispatch(filterModeIsOn());
      dispatch(filterBooks(filtredBooks));
    } else {
      console.log("none of condition");
    }
  };

  useEffect(() => {
    getAvailableCategories();
  }, [books]);

  return (
    <>
      <>
        <Box
          bg="#ffffff"
          minHeight="10vh"
          w="100%"
          display="flex"
          flexDirection={isLargerThan500px ? "row" : "column"}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          mt="50px"
        >
          <Select
            onChange={(e) =>
              setFiltredValues({ ...filtredValues, author: e.target.value })
            }
            marginTop="10px"
            mr="20px"
            h="5.2vh"
            w="200px"
            size="sm"
            placeholder="Author"
          >
            {/* <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
            {authors?.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </Select>
          <Box marginTop="10px" display="flex" alignItems="center">
            <Text mr="5px">Min($)</Text>
            <NumberInput
              mr="20px"
              w="90px"
              h="5vh"
              defaultValue={0}
              min={0}
              max={1000}
              onChange={(e) =>
                setFiltredValues({ ...filtredValues, minPrice: parseInt(e) })
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box marginTop="10px" display="flex" alignItems="center">
            <Text mr="5px">Max($)</Text>
            <NumberInput
              onChange={(e) =>
                setFiltredValues({ ...filtredValues, maxPrice: parseInt(e) })
              }
              mr="20px"
              w="90px"
              h="5vh"
              defaultValue={0}
              min={0}
              max={1000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Select
            marginTop="10px"
            mr="20px"
            h="5.2vh"
            w="200px"
            size="sm"
            placeholder="Category"
            onChange={(e) =>
              setFiltredValues({ ...filtredValues, category: e.target.value })
            }
          >
            {/* <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option> */}
            {categories?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Button
            marginTop="10px"
            onClick={() => {
              filterBooksFunc();
            }}
            colorScheme="teal"
            size="md"
          >
            Search
          </Button>
        </Box>
        <Text
          color="red"
          mt="10px"
          w="100%"
          textAlign="center"
          height="20px"
          mb="10px"
        >
          {errorMessage}
        </Text>
      </>
    </>
  );
};

export default React.memo(FilterBooksSection);
