import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";
import React from "react";

//taken from chakra-ui's documentation https://chakra-ui.com/docs/form/input#password-input-example
export default function PasswordInput(props: any) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        {...props.field}
        pr="4.5rem"
        type={show ? "text" : "password"}
        _placeholder={{ color: "white" }}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
