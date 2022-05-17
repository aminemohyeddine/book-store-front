import { LoginConst } from "../../constants/loginConst";
import { Dispatch } from "react";
import { userI } from "../../../constants/interfaces";

export const userLoggedInn = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.userLoggedIn,
    });
  };
};

export const userLoggedOut = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.userLoggedOut,
    });
  };
};

export const changeTrackLogIn = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.changeTrackLogIn,
    });
  };
};

export const fillUserDetails = (user: userI) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.fillUserDetails,
      user: user,
    });
  };
};

export const deleteUserDetails = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.deleteUserDetails,
    });
  };
};

export const loginMode = (loginM: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: LoginConst.loginMode,
      payload: loginM,
    });
  };
};
