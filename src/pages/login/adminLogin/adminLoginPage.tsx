import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { changeTrackLogIn } from "../../../redux/actions/loginActions/loginActions";
import axios from "axios";

import {
  loginMode,
  userLoggedInn,
} from "../../../redux/actions/loginActions/loginActions";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [message, setMessage] = useState("");

  const [adminDetails, setAdminDetails] = React.useState({
    name: "",
    password: "",
  });

  const submitAdminLogin = async () => {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}auth/adminsignin`,
      {
        userName: adminDetails.name,
        password: adminDetails.password,
        isAdmin: true,
      }
    );

    if (loginResponse.data.success === true) {
      cookies.set("userToken", loginResponse.data.token, { path: "/" });
      cookies.set("userId", loginResponse.data._id, { path: "/" });
      cookies.set("login", "success", { path: "/" });
      cookies.set("loginMode", "admin", { path: "/" });
      dispatch(userLoggedInn());
      dispatch(changeTrackLogIn());
      dispatch(loginMode("admin"));
      navigate("/admin/books");
    } else {
      setMessage("username and password doesn't match");
    }
  };

  return (
    <Box
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <form>
        <Text h="20px" w="100%">
          {message}
        </Text>
        <Box
          h="50vh"
          w="50%"
          border="1px solid black"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minWidth="350px"
        >
          <Input
            placeholder="name"
            w="80%"
            mb="20px"
            onChange={(e) => {
              setAdminDetails({ ...adminDetails, name: e.target.value });
            }}
            type="text"
          />
          <Input
            w="80%"
            mb="20px"
            placeholder="password"
            type="password"
            onChange={(e) => {
              setAdminDetails({ ...adminDetails, password: e.target.value });
            }}
          />
          <Button
            type="submit"
            onClick={(event) => {
              submitAdminLogin();
              event.preventDefault();
            }}
            w="80%"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdminLoginPage;
