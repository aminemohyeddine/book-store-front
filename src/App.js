import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBarComponent, FooterComponent } from "./components";
import CheckoutPage from "./pages/checkout/CheckOutPage";
import AddBookAdmin from "./adminPages/books/AddBookAdmin.tsx";
import { BookI } from "./constants/interfaces.ts";

//admin pages
import ListBooksAdmin from "./adminPages/books/ListBooksAdmin.tsx";
import ModifyBookAdmin from "./adminPages/books/ModifyBookAdmin.tsx";

import ScrollToTop from "react-scroll-to-top";
import {
  HomePage,
  SignUpPage,
  LoginPage,
  NotFoundPage,
  BooksPage,
  SingleBookPage,
} from "./pages";
import { getAllBooks } from "./redux/actions/booksActions.ts/booksActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import TawkTo from "tawkto-react";
import { addCartFromLocalStorage } from "./redux/actions/cartActions/cartActions";
import AdminLoginPage from "./pages/login/adminLogin/adminLoginPage";

import {
  userLoggedInn,
  userLoggedOut,
  fillUserDetails,
  loginMode,
} from "./redux/actions/loginActions/loginActions";

export const App = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const userToken = cookies.get("userToken");

  const loginState = useSelector((state: RootState) => state.loginStates);
  const userLoggedIn: boolean = loginState.userLoggedIn;
  const trackLogin: boolean = loginState.trackLogIn;
  // const loginMode: string = loginState.loginMode;

  const cartState: any = useSelector((state: RootState) => state.cart);
  const cart: BookI[] = cartState.cart;

  React.useLayoutEffect(() => {
    if (cart.length > 0) {
      const realCart = JSON.stringify(cart);
      cookies.set("cart", realCart, { path: "/" });
    }
    if (cart.length === 0 && userLoggedIn) {
      cookies.set("cart", [], { path: "/" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  React.useEffect(() => {
    const cartItems = cookies.get("cart");

    if (cartItems !== undefined && cartItems.length > 0) {
      dispatch(addCartFromLocalStorage(cartItems));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBooks = async () => {
    const userToken = cookies.get("userToken");
    // console.log(loginMode);

    const response = await axios.request({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}books/allbooks`,
    });
    dispatch(getAllBooks(response.data));
  };

  const checkUserStatus = async () => {
    const userId = cookies.get("userId");
    const userToken = cookies.get("userToken");
    const loginStatus = cookies.get("login");
    const googleUser = cookies.get("googleUser");

    if (
      userId === undefined &&
      userToken === undefined &&
      loginStatus === undefined &&
      googleUser === undefined
    ) {
      dispatch(userLoggedOut());
      console.log("no user data");
    }
    try {
      if (googleUser === undefined) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}auth/verifytoken`,
          {
            token: userToken,
            mode: loginMode,
          }
        );
        if (response.data.login === "success") {
          dispatch(userLoggedInn());
          dispatch(fillUserDetails(response.data.user));
        }
      } else {
        dispatch(userLoggedInn());
        dispatch(fillUserDetails(googleUser));
        dispatch(loginMode("google"));
      }
    } catch (e) {
      cookies.set("login", "failed", { path: "/" });
      cookies.set("userId", "", { path: "/" });
      cookies.set("userToken", "", { path: "/" });
      cookies.set("loginMode", "", { path: "/" });
      dispatch(getAllBooks([]));
    }
  };

  React.useEffect(() => {
    if (userToken === undefined || userToken === "") {
      console.log("nothing to verify");
      cookies.set("loginMode", "", { path: "/" });
    } else {
      checkUserStatus();
    }
  }, [trackLogin]); //eslint-disable-line

  React.useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackLogin]);

  React.useEffect(() => {
    var tawk = new TawkTo("62606950b0d10b6f3e6e8b35", "1g149mp1f");

    tawk.onStatusChange((status: any) => {
      console.log("tawk status changed to : ", status);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBarComponent />
        <ScrollToTop
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "60px",
            marginTop: "80px",
            bottom: "30px",
            zIndex: "100",
          }}
          smooth={true}
          color="#2b9895"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/book/:bookId" element={<SingleBookPage />} />
          <Route path="/admin/books" element={<ListBooksAdmin />} />
          <Route path="/admin/books/modify/:id" element={<ModifyBookAdmin />} />
          <Route path="/admin/books/addbook" element={<AddBookAdmin />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <FooterComponent />
    </ChakraProvider>
  );
};
