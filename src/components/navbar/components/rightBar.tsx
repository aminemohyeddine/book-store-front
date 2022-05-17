import React from "react";
import {
  Box,
  Text,
  Input,
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  userLoggedOut,
  deleteUserDetails,
  loginMode,
} from "../../../redux/actions/loginActions/loginActions";
import { getAllBooks } from "../../../redux/actions/booksActions.ts/booksActions";
import SearchBookComponent from "./searchBook";
import { BookI } from "../../../constants/interfaces";
import { RootState } from "../../../redux/store";
import { userI } from "../../../constants/interfaces";

interface Props {
  setSearchedBook: any;
  searchBook: any;
}

const RightBar: React.FC<Props> = ({ setSearchedBook, searchBook }) => {
  const cookies = new Cookies();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const loginStates = useSelector((state: RootState) => state.loginStates);
  const user: userI = loginStates.user;
  const userLoggedIn: boolean = loginStates.userLoggedIn;

  const stateData: any = useSelector((state: RootState) => state.Books);
  const filteredBooks: BookI[] = stateData.filtredBooks;

  const changeSearchBooks = (event: any) => {
    setSearchedBook(event.target.value);
  };

  const logoutEvent = () => {
    dispatch(deleteUserDetails());
    dispatch(userLoggedOut());
    cookies.remove("googleUser", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userToken", { path: "/" });
    cookies.set("login", "failed", { path: "/" });
    dispatch(getAllBooks([]));
    setSearchedBook("");
    dispatch(loginMode(""));
    onClose();
  };

  return (
    <Box cursor="pointer" mr={0}>
      <Button
        ref={btnRef}
        colorScheme="black"
        onClick={onOpen}
        className="hamburgerIcon"
        fontSize="25px"
        leftIcon={<HamburgerIcon color="black" />}
      ></Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Book Store</DrawerHeader>

          <DrawerBody>
            <Input
              isDisabled={false}
              onChange={changeSearchBooks}
              placeholder="Search For A Book..."
            />
            {filteredBooks.length > 0 && (
              <Box
                zIndex="1000"
                top="42x"
                bg="white"
                w="100%"
                height="70vh"
                overflowY="scroll"
                onClick={onClose}
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
                borderRadius="10px"
              >
                {filteredBooks?.map((book: BookI, index: number) => (
                  <Box
                    onClick={() => {
                      onOpen();
                      dispatch(searchBook([], ""));
                    }}
                    key={index}
                  >
                    <SearchBookComponent book={book} />
                  </Box>
                ))}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter w="100%">
            <Box w="100%" display="flex" justifyContent="space-between">
              <>
                <Link to={!userLoggedIn ? "/signup" : ""}>
                  <Text
                    _hover={{ color: "#bee2f8" }}
                    onClick={onClose}
                    color="black"
                    fontSize="17px"
                  >
                    {userLoggedIn ? <>{user.userName}</> : <>Sign Up</>}
                  </Text>
                </Link>

                <Link to="/books">
                  <Text
                    _hover={{ color: "#bee2f8" }}
                    onClick={onClose}
                    color="black"
                    fontSize="17px"
                  >
                    books
                  </Text>
                </Link>

                <Link to={userLoggedIn ? "/" : "/login"}>
                  <Text
                    _hover={{ color: userLoggedIn ? "red" : "#bee2f8" }}
                    color="black"
                    fontSize="17px"
                    onClick={() => {
                      if (userLoggedIn) {
                        logoutEvent();
                      } else {
                        onClose();
                      }
                    }}
                  >
                    {userLoggedIn ? <>Logout</> : <>Sign In</>}
                  </Text>
                </Link>
              </>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default RightBar;
