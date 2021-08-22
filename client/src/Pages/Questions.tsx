import {
  Box,
  Center,
  Tab,
  Text,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../Components/Navbar";

function Title() {
  return (
    <Center>
      <Text>Question Sets</Text>
    </Center>
  );
}

export default function Questions() {
  return (
    <>
      <Navbar />
      <Center>
        <Box maxW="1000px">
          <Title />
          <Tabs bgColor="red" width="500px" mt={3} variant="solid-rounded">
            <Center>
              <TabList>
                <Tab>Everyone's</Tab>
                <Tab>Only Yours</Tab>
              </TabList>
            </Center>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
}
