import React from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  Box,
  Button,
  Input,
  Text,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { allCountries } from "./allCountries";
import { addAddressDetailsCheckout } from "../../../redux/actions/ordersAction/orderAction";

interface Props {
  setStep: any;
}

const ShippingForm: React.FC<Props> = ({ setStep }) => {
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [useDetailsForPayment, setUseDetailsForPayment] = React.useState(false);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        zipCode: "",
      }}
      onSubmit={(values, actions) => {
        const checkoutData = {
          ...values,
          selectedCountry: selectedCountry,
          useDetailsForPayment: useDetailsForPayment,
        };
        dispatch(addAddressDetailsCheckout(checkoutData));
        setStep("review");
      }}
      validator={() => ({})}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "15 characters or less")
          .min(2, "2 characters or more")
          .required("Required"),
        lastName: Yup.string()
          .max(15, " 15 characters or less")
          .min(2, " 2 characters or more")
          .required("Required"),
        email: Yup.string().email().required("Required"),
        phoneNumber: Yup.string()
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
          )
          .required("Required"),
        address: Yup.string()
          .max(80, " 80 characters or less")
          .min(10, " 10 characters or more")
          .required("Required"),
        city: Yup.string()
          .max(15, " 15 characters or less")
          .min(2, " 2 characters or more")
          .required("Required"),

        zipCode: Yup.string()
          .max(15, " 15 characters or less")
          .min(2, " 2 characters or more")
          .required("Required"),
      })}
    >
      {(props) => (
        <>
          <Box mt="15px" minHeight="60.5vh" w="100%" position="relative">
            <Text ml="30px" mt="20px">
              Shipping address
            </Text>
            <Form>
              <Box w="100% " pt="20px" display="flex">
                <Box width="50%" ml="5%" pr="5%">
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <Input
                          style={{ padding: "15px" }}
                          height="20px"
                          bg="primary"
                          {...field}
                          id="firstName"
                          placeholder="fisrtname *"
                          autoComplete="off"
                          fontSize="xs"
                        />
                        <Box mt="8px" h="20px">
                          <FormErrorMessage>
                            <Text fontSize="xs"> {form.errors.firstName} </Text>
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box width="45%" mr="5%">
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <Input
                          style={{ padding: "15px" }}
                          height="20px"
                          bg="primary"
                          {...field}
                          id="lastName"
                          placeholder=" lastName*"
                          type="text"
                          autoComplete="off"
                          fontSize="xs"
                        />
                        <Box mt="8px" h="20px">
                          <FormErrorMessage>
                            <Text fontSize="xs"> {form.errors.lastName} </Text>
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Box>
              <Box width="90%" mr="5%" ml="5%">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        style={{ padding: "15px" }}
                        height="20px"
                        bg="primary"
                        {...field}
                        id="email"
                        placeholder=" email *"
                        type="email"
                        autoComplete="off"
                        fontSize="xs"
                      />
                      <Box mt="8px" h="20px">
                        <FormErrorMessage>
                          <Text fontSize="xs"> {form.errors.email} </Text>
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box width="90%" mr="5%" ml="5%">
                <Field name="phoneNumber">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.phoneNumber && form.touched.phoneNumber
                      }
                    >
                      <Input
                        style={{ padding: "15px" }}
                        height="20px"
                        bg="primary"
                        {...field}
                        id="phoneNumber"
                        placeholder=" phoneNumber *"
                        type="text"
                        autoComplete="off"
                        fontSize="xs"
                      />
                      <Box mt="8px" h="20px">
                        <FormErrorMessage>
                          <Text fontSize="xs"> {form.errors.phoneNumber} </Text>
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box width="90%" mr="5%" ml="5%">
                <Field name="address">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.address && form.touched.address}
                    >
                      <Input
                        style={{ padding: "15px" }}
                        height="20px"
                        bg="primary"
                        {...field}
                        id="address"
                        placeholder="address *"
                        type="text"
                        autoComplete="off"
                        fontSize="xs"
                      />
                      <Box mt="8px" h="20px">
                        <FormErrorMessage>
                          <Text fontSize="xs"> {form.errors.address} </Text>
                        </FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
              </Box>

              <Box w="100% " display="flex">
                <Box width="50%" ml="5%" pr="5%">
                  <Field name="city">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.city && form.touched.city}
                      >
                        <Input
                          style={{ padding: "15px" }}
                          height="20px"
                          bg="primary"
                          {...field}
                          id="city"
                          placeholder="city *"
                          autoComplete="off"
                          fontSize="xs"
                        />
                        <Box mt="8px" h="20px">
                          <FormErrorMessage>
                            <Text fontSize="xs"> {form.errors.city} </Text>
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box width="50%" ml="5%" pr="5%">
                  <Field name="zipCode">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.zipCode && form.touched.zipCode}
                      >
                        <Input
                          style={{ padding: "15px" }}
                          height="20px"
                          bg="primary"
                          {...field}
                          id="zipCode"
                          placeholder="zip code *"
                          type="text"
                          autoComplete="off"
                          fontSize="xs"
                        />
                        <Box mt="8px" h="20px">
                          <FormErrorMessage>
                            <Text fontSize="xs"> {form.errors.zipCode} </Text>
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Box>
              <Select
                w="90%"
                ml="5%"
                mr="5%"
                mt="10px"
                size="s"
                placeholder="Select A Country"
                isRequired={true}
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
              >
                {allCountries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <Checkbox
                onChange={(e) => {
                  setUseDetailsForPayment(e.target.checked);
                }}
                ml="30px"
                mt="20px"
              >
                Use this address for payment details
              </Checkbox>

              <Button
                mt={4}
                color="white"
                bg="#2d9894"
                type="submit"
                mb="10px"
                position="absolute"
                bottom="-10px"
                right="0px"
              >
                Next
              </Button>
            </Form>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default ShippingForm;
