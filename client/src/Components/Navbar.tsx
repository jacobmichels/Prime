import { HamburgerIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import { BASE_URL } from "../Util/BaseURL";

interface NavbarProps {
  noregister?: boolean;
  nologin?: boolean;
}

export default function Navbar(props: NavbarProps) {
  const history = useHistory();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  const authCtx = React.useContext(AuthContext);

  return (
    <Box bg="green.500">
      <Flex
        as="nav"
        margin="auto"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        maxW="1300px"
        color="white"
        {...props}
      >
        <Link to="/">
          <Heading mr={5} as="h1" size="lg" letterSpacing={"tighter"}>
            Prime
          </Heading>
        </Link>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon boxSize={7} />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          spacing={4}
          mt={{ base: 4, md: 0 }}
        >
          <Spacer display={{ base: "none", md: "block" }}></Spacer>
          {authCtx.username ? (
            <Box>
              <Button
                display="block"
                variant="solid"
                bg="green.600"
                _hover={{ bg: "green.900", borderColor: "green.900" }}
                onClick={async function () {
                  let res = await fetch(BASE_URL + "/User/Logout", {
                    method: "GET",
                    credentials: "include",
                  });
                  if (res.status === 200) {
                    authCtx.setUsername("");
                    history.push("/home");
                    toast({
                      title: "Logged out 👍",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              <Box>
                <Link to="/register">
                  <Button
                    display="block"
                    variant="solid"
                    bg="green.600"
                    _hover={{ bg: "green.900", borderColor: "green.900" }}
                    visibility={props.noregister ? "hidden" : "visible"}
                  >
                    Register
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link to="/login">
                  <Button
                    display="block"
                    variant="solid"
                    bg="green.600"
                    _hover={{ bg: "green.900", borderColor: "green.900" }}
                    visibility={props.nologin ? "hidden" : "visible"}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            </>
          )}

          <IconButton
            bg="green.600"
            borderRadius="0.375rem"
            variant="solid"
            aria-label="Toggle between dark and light mode"
            icon={<SunIcon />}
          />
        </Stack>
      </Flex>
    </Box>
  );
}
