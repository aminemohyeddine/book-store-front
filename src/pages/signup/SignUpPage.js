import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Box,
  Text,
  Button,
  Input,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
var bookImage = require("../../assets/books-as-a-window-to-the-world-binka-kirova.webp");

const SignUp = () => {
  const [response, setResponse] = React.useState("");
  const [isLargerThan860] = useMediaQuery("(min-width: 860px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");
  const toast = useToast();
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <Formik
      initialValues={{ userName: "", password: "", email: "", phoneNumber: "" }}
      onSubmit={async (values, actions) => {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}auth/signup`,
          {
            userName: values.userName,
            password: values.password,
            email: values.email,
            phoneNumber: values.phoneNumber,
            isAdmin: false,
          }
        );
        setResponse(response.data);
        if (response.data === "user created") {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setTimeout(function () {
            navigate("/login");
          }, 1000);
        }
      }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .max(15, "Must be 15 characters or <")
          .min(2, "Must be 2 characters or >")
          .required("Required"),
        password: Yup.string()
          // .matches(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          // )
          .required("Required"),
        email: Yup.string()
          .max(30, "Must be 15 characters or <")
          .min(7, "Must be 7 characters or >")
          .email("type a valid email")
          .required("Required"),
        phoneNumber: Yup.string()
          .matches(phoneRegExp, "Phone number is not valid")
          .max(15, "Must be 15 number or <")
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
            <Box flex="3" w="100%">
              <Box
                h="90vh"
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box
                  h={isLargerThan550 ? "60vh" : "70vh"}
                  w={isLargerThan550 ? "95%" : "80%"}
                  bg="white"
                  mt="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="10px"
                >
                  <Box
                    w="80%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mb="20px"
                      >
                        <Text
                          _hover={{ color: "#2d9894" }}
                          cursor="pointer"
                          color="black"
                        >
                          Sign Up To Books Universe
                        </Text>
                        <Text>{response}</Text>
                      </Box>
                      <Form>
                        <Box display="flex" flexDirection="column">
                          <Box
                            display="flex"
                            flexDirection={isLargerThan550 ? "row" : "column"}
                          >
                            <Box width="100%" h="90px">
                              <Field name="userName">
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.userName &&
                                      form.touched.userName
                                    }
                                  >
                                    <Input
                                      bg="primary"
                                      {...field}
                                      id="userName"
                                      placeholder="Enter Your username"
                                      autoComplete="off"
                                    />
                                    <Box w="100%" mb="30px">
                                      <FormErrorMessage>
                                        {form.errors.userName}
                                      </FormErrorMessage>
                                    </Box>
                                  </FormControl>
                                )}
                              </Field>
                            </Box>

                            <Box
                              ml={isLargerThan550 ? "15px" : "0px"}
                              width="100%"
                              h="90px"
                            >
                              <Field name="password">
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.password &&
                                      form.touched.password
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
                          </Box>
                          <Box
                            display="flex"
                            flexDirection={isLargerThan550 ? "row" : "column"}
                          >
                            <Box width="100%" h="90px">
                              <Field name="email">
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.email && form.touched.email
                                    }
                                  >
                                    <Input
                                      bg="primary"
                                      {...field}
                                      id="email"
                                      placeholder="Enter your email"
                                      type="email"
                                      autoComplete="off"
                                    />
                                    <Box h="100px">
                                      <FormErrorMessage>
                                        {form.errors.email}
                                      </FormErrorMessage>
                                    </Box>
                                  </FormControl>
                                )}
                              </Field>
                            </Box>

                            <Box
                              ml={isLargerThan550 ? "15px" : "0px"}
                              width="100%"
                              h="90px"
                            >
                              <Field name="phoneNumber">
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.phoneNumber &&
                                      form.touched.phoneNumber
                                    }
                                  >
                                    <Input
                                      bg="primary"
                                      {...field}
                                      id="phoneNumber"
                                      placeholder="Enter your phone number"
                                      type="phoneNumber"
                                      autoComplete="off"
                                    />
                                    <Box h="30px">
                                      <FormErrorMessage>
                                        {form.errors.phoneNumber}
                                      </FormErrorMessage>
                                    </Box>
                                  </FormControl>
                                )}
                              </Field>
                            </Box>
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
                        </Box>
                      </Form>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default SignUp;
