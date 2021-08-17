import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import PasswordInput from "../Components/PasswordInput";

export default function Login() {
  function validateUsernameOrEmail(value: string) {
    let error;
    if (!value) {
      error = "Username/Email is required.";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required.";
    }
    return error;
  }

  return (
    <>
      <Navbar nologin />
      <Box
        p={3}
        borderRadius="10px"
        bg="blue.500"
        mt={{ base: "5", md: "175" }}
        ml="auto"
        mr="auto"
        maxW={{ base: "300px", md: "800px" }}
      >
        <Text color="white" ml={4} mb={4} fontWeight="bold" fontSize="3xl">
          Login
        </Text>
        <Box ml={3} mr={3}>
          <Formik
            initialValues={{}}
            onSubmit={async (values, actions) => {
              // let res = await fetch(BASE_URL + "/User/Login", {
              //   method: "POST",
              //   body: JSON.stringify(values),
              //   credentials: "include",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              // });
            }}
          >
            {(props) => (
              <Form>
                <Field
                  name="usernameOrEmail"
                  validate={validateUsernameOrEmail}
                >
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={
                        form.errors.usernameOrEmail &&
                        form.touched.usernameOrEmail
                      }
                    >
                      <FormLabel color="white" htmlFor="usernameOrEmail">
                        Username or Email
                      </FormLabel>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="usernameOrEmail"
                        _placeholder={{ color: "white" }}
                        placeholder="Username or Email"
                      />
                      <FormErrorMessage
                        fontSize="md"
                        // fontWeight="bold"
                        color="white"
                      >
                        ⚠️ {form.errors.usernameOrEmail}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel color="white" htmlFor="password">
                        Password
                      </FormLabel>
                      {/* <Input
                        autoComplete="off"
                        {...field}
                        id="password"
                        _placeholder={{ color: "white" }}
                        placeholder="Password"
                      /> */}
                      <PasswordInput field={field}></PasswordInput>
                      <FormErrorMessage
                        fontSize="md"
                        // fontWeight="semibold"
                        color="white"
                      >
                        ⚠️ {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  m={3}
                  variant="solid"
                  color="white"
                  bg="blue.600"
                  _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Link to="/">
                  <Button
                    m={3}
                    color="white"
                    variant="solid"
                    bg="blue.600"
                    _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                  >
                    Cancel
                  </Button>
                </Link>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
