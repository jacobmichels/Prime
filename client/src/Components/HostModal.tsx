import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BASE_URL } from "../Util/BaseURL";

export default function HostModal(props: any) {
  const [gameName, setGameName] = useState("");
  const [gamePrivate, setGamePrivate] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckbox = () => {
    setGamePrivate(!gamePrivate);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Host a game</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setIsSubmitting(true);
            let res = await fetch(
              BASE_URL +
                `/Game/CreateGame?gameName=${gameName}&isPrivate=${gamePrivate}`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (res.status === 200) {
              alert("game created");
            } else {
              alert("game creation failed");
              console.log(await res.text());
            }

            setIsSubmitting(false);
          }}
        >
          <ModalBody>
            <FormControl>
              <FormLabel>Session Name</FormLabel>
              <Input
                value={gameName}
                onChange={(event) => {
                  setGameName(event.target.value);
                }}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mt={2}>
              <Center>
                <HStack>
                  <FormLabel>Private</FormLabel>
                  <Checkbox isChecked={gamePrivate} onChange={handleCheckbox} />
                </HStack>
              </Center>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Start
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
