import React from "react";
import { Text } from "@chakra-ui/layout";

interface TitleTextPropsInterface {
  color: string;
  children: string;
}

export default function TitleText(props: TitleTextPropsInterface) {
  return (
    <Text color={props.color} fontWeight="bold" fontSize="3xl">
      {props.children}
    </Text>
  );
}
