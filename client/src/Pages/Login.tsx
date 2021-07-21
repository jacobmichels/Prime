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
        bg="gray.700"
        mt={{ base: "5", md: "175" }}
        ml="auto"
        mr="auto"
        maxW={{ base: "300px", md: "800px" }}
      >
        <Text color="white" mb={4} fontWeight="bold" fontSize="3xl">
          Login
        </Text>
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="usernameOrEmail" validate={validateUsernameOrEmail}>
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
                      // fontWeight="semibold"
                      color="red"
                    >
                      {form.errors.usernameOrEmail}
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
                    <Input
                      autoComplete="off"
                      {...field}
                      id="password"
                      _placeholder={{ color: "white" }}
                      placeholder="Password"
                    />
                    <FormErrorMessage
                      fontSize="md"
                      // fontWeight="semibold"
                      color="red"
                    >
                      {form.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                m={3}
                variant="solid"
                color="white"
                bg="gray.600"
                _hover={{ bg: "gray.900", borderColor: "gray.900" }}
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
                  bg="gray.600"
                  _hover={{ bg: "gray.900", borderColor: "gray.900" }}
                >
                  Cancel
                </Button>
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
