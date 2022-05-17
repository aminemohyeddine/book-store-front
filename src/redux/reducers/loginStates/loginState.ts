import { LoginConst } from "../../constants/loginConst";

const initialState = {
  user: {
    email: "",
    password: "",
    phoneNumber: "",
    userName: "",
    __v: 0,
    _id: "",
  },
  userLoggedIn: false,
  trackLogIn: false,
  loginMode: "",
};

interface usersAction {
  type:
    | LoginConst.userLoggedIn
    | LoginConst.userLoggedOut
    | LoginConst.changeTrackLogIn
    | LoginConst.fillUserDetails
    | LoginConst.loginMode
    | LoginConst.deleteUserDetails;
  payload: any;
  user: any;
}

export const loginStates = (state = initialState, action: usersAction) => {
  switch (action.type) {
    case LoginConst.userLoggedIn:
      return { ...state, userLoggedIn: true };
    case LoginConst.userLoggedOut:
      return { ...state, userLoggedIn: false };
    case LoginConst.changeTrackLogIn:
      return { ...state, trackLogIn: !state.trackLogIn };
    case LoginConst.fillUserDetails:
      return { ...state, user: action.user };
    case LoginConst.deleteUserDetails:
      return {
        ...state,
        user: {
          email: "",
          password: "",
          phoneNumber: "",
          userName: "",
          __v: 0,
          _id: "",
        },
      };
    case LoginConst.loginMode:
      return { ...state, loginMode: action.payload };

    default:
      return state;
  }
};
