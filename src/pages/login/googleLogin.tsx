import React from "react";
import { Box } from "@chakra-ui/react";
import { GoogleLogout } from "react-google-login";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  userLoggedInn,
  fillUserDetails,
  deleteUserDetails,
  userLoggedOut,
  loginMode,
} from "../../redux/actions/loginActions/loginActions";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const loginState: any = useSelector((state: RootState) => state.loginStates);
  const userLoggedIn: boolean = loginState.userLoggedIn;

  const loginSuccess = (res: any) => {
    console.log(typeof res, res);

    const user = res.profileObj;
    cookies.set("userToken", user.googleId, { path: "/" });
    cookies.set("userId", user.googleId, { path: "/" });
    cookies.set("login", "success", { path: "/" });
    dispatch(userLoggedInn());
    dispatch(loginMode("google"));
    const user2 = {
      email: user.email,
      password: "login using google",
      phoneNumber: "login using google",
      userName: user.familyName,
      __v: 0,
      _id: user.googleId,
      imageUrl: user.imageUrl,
    };
    const realUser = JSON.stringify(user2);

    cookies.set("googleUser", realUser, { path: "/" });
    dispatch(fillUserDetails(user2));
    cookies.set("userDetails", user2, { path: "/" });
    // cookies.set("googleLogin", user2.userName, { path: "/" });
    cookies.set("loginMode", "google", { path: "/" });
  };
  const loginFailed = (res: string) => {
    console.log("login failed", res);
  };

  const logout = () => {
    dispatch(deleteUserDetails());
    dispatch(userLoggedOut());
    cookies.remove("userId", { path: "/" });
    cookies.remove("adminLoogedin", { path: "/" });
    cookies.remove("loginMode", { path: "/" });
    cookies.remove("userToken", { path: "/" });
    cookies.remove("googleUser", { path: "/" });
    cookies.set("login", "failed", { path: "/" });
    dispatch(loginMode(""));
  };
  return (
    <Box>
      {!userLoggedIn ? (
        <GoogleLogin
          clientId="758167628181-ioncd3ua417ss1gmpg1j8jfattr2s4jk.apps.googleusercontent.com"
          buttonText="Login Using Google"
          onSuccess={loginSuccess}
          onFailure={loginFailed}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <GoogleLogout
          clientId="758167628181-ioncd3ua417ss1gmpg1j8jfattr2s4jk.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      )}
    </Box>
  );
};

export default GoogleLoginButton;
