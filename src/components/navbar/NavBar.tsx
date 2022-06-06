import React, { useState, useEffect } from "react";
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
import SearchComponent from "./components/searchComponent";
import { Search2Icon, CloseIcon } from "@chakra-ui/icons";
import Cookies from "universal-cookie";
import { userI } from "../../constants/interfaces";
import { Link } from "react-router-dom";
import SearchBookComponent from "./components/searchBook";
import { useDispatch, useSelector } from "react-redux";
import { BookI } from "../../constants/interfaces";
import { RootState } from "../../redux/store";
import RightBar from "./components/rightBar";
import { searchBook } from "../../redux/actions/booksActions.ts/booksActions";
import {
  userLoggedOut,
  deleteUserDetails,
  loginMode,
} from "../../redux/actions/loginActions/loginActions";
import CartList from "./components/cartList";
import { changeCartState } from "../../redux/actions/cartActions/cartActions";
import CartComponent from "./components/cartComponent";

var Diamond = require("../../assets/f4d3350e1ed84651a0f8efddc8057e00 (1).png");
var cartImage = require("../../assets/istockphoto-1206806317-612x612.jpg");

interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [isLargerThan930] = useMediaQuery("(min-width:1026px)");
  const [isLargerThan800] = useMediaQuery("(min-width: 879px)");

  const loginCookie = cookies.get("login");
  const loginModeCookie = cookies.get("loginMode");

  const loginState = useSelector((state: RootState) => state.loginStates);
  const user: userI = loginState.user;
  const mode: string = loginState.loginMode;

  const allBooks: any = useSelector(
    (state: RootState) => state.Books.booksData
  );

  const logoutHandler = () => {
    dispatch(deleteUserDetails());
    dispatch(userLoggedOut());
    cookies.remove("userId", { path: "/" });
    cookies.remove("adminLoogedin", { path: "/" });
    cookies.remove("loginMode", { path: "/" });
    cookies.remove("userToken", { path: "/" });
    cookies.remove("googleUser", { path: "/" });
    cookies.set("login", "failed", { path: "/" });
    dispatch(loginMode(""));
    // setSearchedBook("");
  };

  return (
    <Box
      position="sticky"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      w="100%"
      p={4}
      color="black"
      zIndex="1000"
      top="0" /* required */
      height="11vh"
    >
      <Box bg="white" display="flex" alignItems="center">
        {loginModeCookie !== "admin" ? (
          <>
            <Box>
              <Link to="/">
                <Image
                  width="60px"
                  height="60px"
                  src={Diamond}
                  alt="Dan Abramov"
                  margin="0px"
                />
              </Link>
            </Box>
            <Link to="/">
              <Text
                ml="20px"
                color="#329793"
                fontSize={isLargerThan930 ? "20px" : "17px"}
                bg="white"
              >
                Books Universe
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Box>
              <Link to="/admin/books">
                <Image
                  width="60px"
                  height="60px"
                  src={Diamond}
                  alt="Dan Abramov"
                  margin="0px"
                />
              </Link>
            </Box>
            <Link to="/admin/books">
              <Text
                ml="20px"
                color="#329793"
                fontSize={isLargerThan930 ? "20px" : "17px"}
                bg="white"
              >
                Books Universe - admin mode
              </Text>
            </Link>
          </>
        )}
      </Box>

      {!isLargerThan800 ? (
        <>
          <RightBar />
        </>
      ) : (
        <>
          <SearchComponent />
          <Box display="flex" alignItems="center">
            {loginCookie === "success" ? (
              <>
                {loginModeCookie !== "admin" && (
                  <>
                    <CartComponent />
                  </>
                )}

                <Link
                  to={loginModeCookie === "admin" ? "/admin/books" : "/books"}
                >
                  <Text
                    color="#329793"
                    fontSize={isLargerThan930 ? "lg" : "16px"}
                    _hover={{ color: "#bee2f8" }}
                  >
                    books
                  </Text>
                </Link>

                {loginModeCookie === "admin" && (
                  <Link to="/admin/books/addbook">
                    <Text
                      ml="20px"
                      color="#329793"
                      fontSize={isLargerThan930 ? "lg" : "16px"}
                      _hover={{ color: "#bee2f8" }}
                    >
                      Add Book
                    </Text>
                  </Link>
                )}

                <Text
                  cursor="pointer"
                  color="#329793"
                  _hover={{ color: "red" }}
                  fontSize={isLargerThan930 ? "lg" : "17px"}
                  ml={4}
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  Logout
                </Text>
                <Text
                  cursor="pointer"
                  color="#329793"
                  fontSize={isLargerThan930 ? "lg" : "17px"}
                  _hover={{ color: "#bee2f8" }}
                  ml="10px"
                >
                  {user.userName}
                </Text>
                {mode === "google" && (
                  <Image
                    width="30px"
                    height="30px"
                    bg="red"
                    src={user.imageUrl}
                    alt="user image"
                    style={{ borderRadius: "100%", marginLeft: "10px" }}
                  />
                )}
              </>
            ) : (
              <>
                <CartComponent />

                <Link to="/books">
                  <Text
                    color="#329793"
                    fontSize={isLargerThan930 ? "lg" : "16px"}
                    ml={4}
                    mr={4}
                    _hover={{ color: "#bee2f8" }}
                  >
                    books
                  </Text>
                </Link>
                <Link to="/login">
                  <Text
                    _hover={{ color: "#bee2f8" }}
                    color="#329793"
                    fontSize={isLargerThan930 ? "lg" : "16px"}
                  >
                    Sign In
                  </Text>
                </Link>

                <Link to="/signup">
                  <Text
                    _hover={{ color: "#bee2f8" }}
                    color="#329793"
                    fontSize={isLargerThan930 ? "lg" : "16px"}
                    ml={4}
                  >
                    Sign Up
                  </Text>
                </Link>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavBar;
