import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Box,
  Button,
  Input,
  useToast,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "./googleLogin";

import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import {
  changeTrackLogIn,
  loginMode,
  fillUserDetails,
} from "../../redux/actions/loginActions/loginActions";
var bookImage = require("../../assets/jaredd-craig-HH4WBGNyltc-unsplash.webp");
interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = React.useState("");
  const cookies = new Cookies();
  const toast = useToast();
  const navigate = useNavigate();
  const [isLargerThan1050] = useMediaQuery("(min-width: 1050px)");
  const [isLargerThan860] = useMediaQuery("(min-width: 860px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      onSubmit={async (values, actions) => {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}auth/signin`,
          {
            userName: values.userName,
            password: values.password,
          }
        );
        if (response.data.success === true) {
          cookies.set("userToken", response.data.token, { path: "/" });
          cookies.set("userId", response.data._id, { path: "/" });
          cookies.set("login", "success", { path: "/" });
          cookies.set("loginMode", "normal", { path: "/" });

          dispatch(loginMode("normal"));

          setResponse("logged in successfully");
          toast({
            title: "success",
            description: "you have logged in successfully",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          dispatch(changeTrackLogIn());
          dispatch(fillUserDetails(response.data.user));
          cookies.set("userDetails", response.data.user, { path: "/" });
          dispatch(loginMode("normal"));
          setTimeout(function () {
            navigate("/books");
          }, 1000);
          dispatch(changeTrackLogIn());
        } else {
          setResponse(response.data);
        }
      }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .max(15, "username Must be 15 characters or less")
          .min(2, "username Must be 2 characters or more")
          .required("Required"),
        password: Yup.string()
          .max(15, "Must be 15 characters or less")
          .min(5, "Must be 5 characters or more")
          .required("Required"),
      })}
    >
      {(props) => (
        <>
          <Box bg="#bee2f8" display="flex" w="100%">
            <Box
              bgImage={bookImage}
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="cover"
              flex="3"
              display={isLargerThan860 ? "" : "none"}
            ></Box>
            <Box flex={isLargerThan1050 ? "2" : "3"}>
              <Box
                h="90vh"
                w={isLargerThan550 ? "100%" : "100%"}
                bg="#bee2f8"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box
                  h="52vh"
                  w={isLargerThan550 ? "400px" : "80%"}
                  bg="white"
                  mt="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="10px"
                >
                  <Box w="80%">
                    <Box
                      w="100%"
                      h="20px"
                      display="flex"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="15px"
                        color={
                          response === "logged in successfully"
                            ? "green"
                            : "red"
                        }
                      >
                        {response}
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      h="8vh"
                      mb="20px"
                    >
                      <Text
                        _hover={{ color: "#2d9894" }}
                        cursor="pointer"
                        color="black"
                      >
                        Already Member
                      </Text>
                      <Text
                        _hover={{ color: "#2d9894" }}
                        cursor="pointer"
                        color="black"
                      >
                        Need Help ?
                      </Text>
                    </Box>
                    <Box
                      mb="10px"
                      w="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <GoogleLoginButton />
                    </Box>

                    <Form>
                      <Box width="100%" h="78px">
                        <Field name="userName">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.userName && form.touched.userName
                              }
                            >
                              <Input
                                bg="primary"
                                {...field}
                                id="userName"
                                placeholder="Enter Your Username"
                                autoComplete="off"
                              />
                              <Box h="30px">
                                <FormErrorMessage>
                                  {form.errors.userName}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Box>

                      <Box width="100%" h="78px">
                        <Field name="password">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <Input
                                bg="primary"
                                {...field}
                                id="password"
                                placeholder="Enter your Password"
                                type="password"
                                autoComplete="off"
                              />
                              <Box h="30px">
                                <FormErrorMessage>
                                  {form.errors.password}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Box>

                      <Button
                        mt={4}
                        color="white"
                        bg="#2d9894"
                        // isLoading={props.isSubmitting}
                        type="submit"
                        mb="10px"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mt="10px"
                  width="400px"
                >
                  <Text color="white" fontSize="xl">
                    Don't have an Account yet?
                  </Text>
                  {/* //#2d9894 */}
                  <Text
                    _hover={{ color: "#2d9894" }}
                    cursor="pointer"
                    fontSize="17px"
                  >
                    <Link to="/signup">Create an account Now!</Link>
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default Login;
