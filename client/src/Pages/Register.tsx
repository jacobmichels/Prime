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

export default function Register() {
  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Username is required.";
    } else if (value.length < 3) {
      error = "Username not long enough.";
    } else if (value.includes("@")) {
      error = "Username cannot include '@'.";
    }
    return error;
  }

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Not a valid email.";
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = "Password is required.";
    } else if (value.length < 6) {
      error = "Password too short.";
    }
    return error;
  }

  return (
    <>
      <Navbar noregister />
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
          Register
        </Text>
        <Box ml={3}>
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
                <Field name="name" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel color="white" htmlFor="username">
                        Username
                      </FormLabel>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="username"
                        _placeholder={{ color: "white" }}
                        placeholder="Username"
                      />
                      <FormErrorMessage fontSize="md" color="white">
                        ⚠️ {form.errors.name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel color="white" htmlFor="email">
                        Email
                      </FormLabel>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="email"
                        _placeholder={{ color: "white" }}
                        placeholder="Email"
                      />
                      <FormErrorMessage fontSize="md" color="white">
                        ⚠️ {form.errors.email}
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
                      <FormErrorMessage fontSize="md" color="white">
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
