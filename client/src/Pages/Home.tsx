import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import HostModal from "../Components/HostModal";
import Navbar from "../Components/Navbar";
import { BASE_URL } from "../Util/BaseURL";
import emailLogo from "../vector/email.svg";
import githubLogo from "../vector/github.svg";
import * as signalR from "@microsoft/signalr";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authCtx = React.useContext(AuthContext);

  useEffect(() => {
    async function GetUser() {
      let res = await fetch(BASE_URL + "/user/me", {
        credentials: "include",
        mode: "cors",
      });
      if (res.status === 200) {
        let json = await res.json();
        authCtx.setUsername(json.username);
      }
    }

    async function ConnectToSignalR() {
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(BASE_URL + "/gamehub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
      await connection.start();
      console.log("SignalR Connected");
    }

    GetUser();
    ConnectToSignalR();
  });

  return (
    <>
      <Navbar />
      <HostModal isOpen={isOpen} onClose={onClose}></HostModal>
      <VStack margin="auto" maxW="1300px" alignItems="center" spacing={6}>
        <Box
          height="100%"
          textAlign="center"
          mt={5}
          p={5}
          bg="tomato"
          borderRadius="15px"
          color="white"
        >
          {authCtx.username ? (
            <>
              <Text fontSize="2xl">Welcome back</Text>
              <Text fontWeight="bold" fontSize="3xl">
                {authCtx.username}
              </Text>
            </>
          ) : (
            <>
              <Text fontSize="2xl">Hello there!</Text>
            </>
          )}

          {/* <Text fontWeight="bold" fontSize="3xl">
            Jacob
          </Text> */}
        </Box>
        <Divider />
        {/* //3 columns on desktop, 1 on mobile //footer */}
        <SimpleGrid color="white" spacing={10} columns={{ base: 1, md: 3 }}>
          <Box borderRadius="15px" bg="blue.500" height="250px" width="300px">
            <Center>
              <VStack>
                <Text fontWeight="bold" mt={2} fontSize="3xl">
                  Play
                </Text>
                <Text fontSize="medium">Find or create a game.</Text>
                <Button
                  onClick={onOpen}
                  display="block"
                  variant="solid"
                  bg="blue.600"
                  _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                >
                  Host new game
                </Button>
                <Formik
                  initialValues={{}}
                  onSubmit={function (values, actions) {
                    alert(values);
                  }}
                >
                  {(props) => (
                    <Form>
                      <VStack spacing={3}>
                        <Field name="joincode">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.joincode && form.touched.joincode
                              }
                            >
                              <Input
                                maxW="150px"
                                autoComplete="off"
                                {...field}
                                id="joincode"
                                _placeholder={{ color: "white" }}
                                placeholder="Joincode"
                              />
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
                          Join with code
                        </Button>
                      </VStack>
                    </Form>
                  )}
                </Formik>
              </VStack>
            </Center>
          </Box>
          <Box borderRadius="15px" bg="blue.500" height="250px" width="300px">
            <Center>
              <VStack spacing={3} textAlign="center">
                <Box>
                  <Text fontWeight="bold" mt={2} fontSize="3xl">
                    Question Sets
                  </Text>
                  <Text pt={2} pl={5} pr={5} fontSize="medium">
                    Create or modify questions sets to be used in game.
                  </Text>
                </Box>
                <Link to="/questions">
                  <Button
                    display="block"
                    variant="solid"
                    bg="blue.600"
                    _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                  >
                    View Question Sets
                  </Button>
                </Link>

                <Button
                  display="block"
                  variant="solid"
                  bg="blue.600"
                  _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                >
                  Create New Question Set
                </Button>
              </VStack>
            </Center>
          </Box>
          <Box borderRadius="15px" bg="blue.500" height="250px" width="300px">
            <Center>
              <VStack spacing={6} textAlign="center">
                <Box>
                  <Text fontWeight="bold" mt={2} fontSize="3xl">
                    Career Stats
                  </Text>
                  <Text pt={2} pl={5} pr={5} fontSize="medium">
                    See how you stack up.
                  </Text>
                </Box>
                <Box>
                  <Button
                    display="block"
                    variant="solid"
                    bg="blue.600"
                    _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                  >
                    Account Stats
                  </Button>
                  <Button
                    mt={3}
                    display="block"
                    variant="solid"
                    bg="blue.600"
                    _hover={{ bg: "blue.900", borderColor: "blue.900" }}
                  >
                    Match History
                  </Button>
                </Box>
              </VStack>
            </Center>
          </Box>
        </SimpleGrid>
        <Divider />
        <Box borderRadius="15px" bg="yellow.500" height="150px" width="300px">
          <Center>
            <VStack>
              <Text color="white" fontWeight="bold" mt={1} fontSize="3xl">
                Learn
              </Text>
              <Text color="white" fontSize="medium">
                Learn about the game.
              </Text>
              <Button
                color="white"
                display="block"
                variant="solid"
                bg="yellow.600"
                _hover={{ bg: "yellow.900", borderColor: "yellow.900" }}
              >
                View game guide
              </Button>
            </VStack>
          </Center>
        </Box>
        <Divider />
        <HStack spacing={5}>
          {/* <Text fontSize="xl"></Text> */}
          <Box borderRadius="10px" p={2} bg="coral">
            <a href="https://github.com">
              {/* <Image alt="Github logo icon" src={githubLogo} /> */}
              <img className="icon" alt="Github icon" src={githubLogo}></img>
            </a>
          </Box>
          <Box borderRadius="10px" p={2} bg="coral">
            <a href="mailto:jacob.michels2025@gmail.com">
              <img className="icon" alt="Email icon" src={emailLogo}></img>
              {/* <Image alt="Email icon" src={emailLogo} /> */}
            </a>
          </Box>
        </HStack>
      </VStack>
    </>
  );
}
