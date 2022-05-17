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
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import { bookStateHasChanged } from "../../redux/actions/booksActions.ts/booksActions";

import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

interface Props {}

const AddBookAdmin: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const toast = useToast();
  const navigate = useNavigate();
  const loginStatus = cookies.get("loginMode");
  const userToken = cookies.get("userToken");

  return (
    <Formik
      initialValues={{
        name: "",
        image: "",
        pagesNumber: "",
        rating: "",
        price: "",
        currency: "",
        category: "",
        author: "",
        language: "",
        description: "",
      }}
      onSubmit={async (values, actions) => {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}books/add`,
          {
            token: userToken,
            name: values.name,
            image: values.image,
            pagesNumber: values.pagesNumber,
            rating: values.rating,
            price: values.price,
            currency: values.currency,
            category: values.category,
            author: values.author,
            language: values.language,
            description: values.description,
          }
        );
        if (response.statusText === "Created") {
          dispatch(bookStateHasChanged());
          toast({
            title: "success",
            description: "Book Created Successfully",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setTimeout(function () {
            navigate("/admin/books");
          }, 1000);
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, " Must be 100 characters or less")
          .min(5, " Must be 5 characters or more")
          .required("Required"),
        image: Yup.string()
          .max(500, "Must be 500 characters or less")
          .min(10, "Must be 10 characters or more")
          .required("Required"),

        pagesNumber: Yup.number()
          .max(10000, " Must be 10000  or less")
          .min(10, " Must be 10  or more")
          .required("Required")
          .nullable(false),
        rating: Yup.number()
          .max(5, " Must be 5  or less")
          .min(0, " Must be 1  or more")
          .required("Required")
          .nullable(false),
        price: Yup.number()
          .max(10000, " Must be 10000  or less")
          .min(1, " Must be 1  or more")
          .required("Required")
          .nullable(false),
        currency: Yup.string()
          .max(10, " Must be 10 characters or less")
          .min(1, " Must be 1 characters or more")
          .required("Required"),
        category: Yup.string()
          .max(20, " Must be 20 characters or less")
          .min(3, " Must be 3 characters or more")
          .required("Required"),
        author: Yup.string()
          .max(20, " Must be 20 characters or less")
          .min(3, " Must be 3 characters or more")
          .required("Required"),
        language: Yup.string()
          .max(15, " Must be 15 characters or less")
          .min(3, " Must be 3 characters or more")
          .required("Required"),
        description: Yup.string()
          .max(3000, " Must be 3000 characters or less")
          .min(30, " Must be 30 characters or more")
          .required("Required"),
      })}
    >
      {(props) => (
        <>
          <Box
            minHeight="100vh"
            pt="20px"
            w="100%"
            bg="cyan"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
            pb="20px"
          >
            {loginStatus !== "admin" ? (
              <Box>login as admin first</Box>
            ) : (
              <Box
                pl="40px"
                pr="40px"
                minWidth="400px"
                w="40%"
                bg="green"
                pt="20px"
              >
                <Form>
                  <Box display="flex" flexDirection="column">
                    <Box width="100%" h="78px">
                      <Field name="name">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="name"
                              placeholder="Book Name"
                              autoComplete="off"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box width="100%" h="78px">
                      <Field name="description">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.description &&
                              form.touched.description
                            }
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="description"
                              placeholder="Book Description"
                              autoComplete="off"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.description}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box width="100%" h="78px">
                      <Field name="image">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={form.errors.image && form.touched.image}
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="image"
                              placeholder="Book Image"
                              autoComplete="off"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.image}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box width="100%" h="78px">
                      <Field name="pagesNumber">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.pagesNumber &&
                              form.touched.pagesNumber
                            }
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="pagesNumber"
                              placeholder="Book pages"
                              autoComplete="off"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.pagesNumber}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box width="100%" h="78px">
                      <Field name="rating">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={
                              form.errors.rating && form.touched.rating
                            }
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="rating"
                              placeholder="Book rating"
                              autoComplete="off"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.rating}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box width="100%" h="78px">
                      <Field name="price">
                        {({ field, form }: { field: any; form: any }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <Input
                              bg="primary"
                              {...field}
                              id="price"
                              placeholder="Book price"
                              autoComplete="off"
                              type="number"
                            />
                            <Box h="30px">
                              <FormErrorMessage>
                                {form.errors.price}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box display="flex">
                      <Box width="100%" h="78px">
                        <Field name="currency">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.currency && form.touched.currency
                              }
                            >
                              <Input
                                bg="primary"
                                {...field}
                                id="currency"
                                placeholder="Book currency"
                                autoComplete="off"
                              />
                              <Box h="30px">
                                <FormErrorMessage>
                                  {form.errors.currency}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Box>

                      <Box width="100%" h="78px">
                        <Field name="category">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.category && form.touched.category
                              }
                            >
                              <Input
                                bg="primary"
                                {...field}
                                id="category"
                                placeholder="Book category"
                                autoComplete="off"
                              />
                              <Box h="30px">
                                <FormErrorMessage>
                                  {form.errors.category}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                    </Box>

                    <Box display="flex">
                      <Box width="50%" h="78px">
                        <Field name="author">
                          {({ field, form }: { field: any; form: any }) => (
                            <FormControl
                              isInvalid={
                                form.errors.author && form.touched.author
                              }
                            >
                              <Input
                                bg="primary"
                                {...field}
                                id="author"
                                placeholder="Book author"
                                autoComplete="off"
                              />
                              <Box h="30px">
                                <FormErrorMessage>
                                  {form.errors.author}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Box>
                      <Box>
                        <Box ml="20px" h="78px">
                          <Field name="language">
                            {({ field, form }: { field: any; form: any }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.language && form.touched.language
                                }
                              >
                                <Input
                                  bg="primary"
                                  {...field}
                                  id="language"
                                  placeholder="Book language"
                                  autoComplete="off"
                                />
                                <Box h="30px">
                                  <FormErrorMessage>
                                    {form.errors.language}
                                  </FormErrorMessage>
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
                      </Box>
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
                </Form>
              </Box>
            )}
          </Box>
        </>
      )}
    </Formik>
  );
};

export default AddBookAdmin;
