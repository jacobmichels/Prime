import {
  Box,
  Button,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../App";
import Navbar from "../Components/Navbar";
import QuestionSetListItem from "../Components/QuestionSetListItem";
import TitleText from "../Components/TitleText";
import { BASE_URL } from "../Util/BaseURL";

function Title() {
  return (
    <Center>
      <TitleText color="white">Question Sets</TitleText>
    </Center>
  );
}

interface QuestionSetState {
  QuestionSets: QuestionSet[];
}

export interface QuestionSet {
  title: string;
  private: boolean;
  questions: Question[];
}

interface Question {
  questionText: string;
  title: string;
  showAnswerTextField: boolean;
  givenAnswer: string;
}

export default function Questions() {
  const [publicQuestionSets, setPublicQuestionSets] =
    useState<QuestionSetState | null>(null);
  const [privateQuestionSets, setPrivateQuestionSets] =
    useState<QuestionSetState | null>(null);

  const authCtx = React.useContext(AuthContext);

  useEffect(() => {
    async function GetQuestionSets() {
      fetch(BASE_URL + "/QuestionSet/GetAllPublic").then(async (res) => {
        let json = await res.json();
        setPublicQuestionSets({ QuestionSets: json });
      });
      if (authCtx.username) {
        fetch(BASE_URL + "/QuestionSet/GetMine").then(async (res) => {
          let json = await res.json();
          setPrivateQuestionSets({ QuestionSets: json });
        });
      }
    }
    GetQuestionSets();
  }, [authCtx]);

  return (
    <>
      <Navbar />
      <Center>
        <Box maxW="1000px">
          <Center>
            <Box
              mt={5}
              width="fit-content"
              bg="purple.500"
              borderRadius={25}
              p={15}
            >
              <VStack>
                <Title />
                <Text>
                  Here is where you will find all public Question Sets, as well
                  as your own.
                </Text>
                <Text>
                  To create a new QuestionSet, click the button below.
                </Text>
                <Button>Create QuestionSet</Button>
              </VStack>
            </Box>
          </Center>
          <Tabs mt={3} variant="solid-rounded">
            <Center>
              <TabList bg="blue.500" borderRadius={20} p={5}>
                <Tab>Everyone's</Tab>
                <Tab>Only Mine</Tab>
              </TabList>
            </Center>
            <Box borderRadius="xl">
              <TabPanels>
                <TabPanel>
                  <Center>
                    <VStack>
                      {publicQuestionSets ? (
                        publicQuestionSets?.QuestionSets.map(
                          (questionSet, index) => {
                            return (
                              <QuestionSetListItem
                                private={questionSet.private}
                                questions={questionSet.questions}
                                title={questionSet.title}
                                key={index}
                              />
                            );
                          }
                        )
                      ) : (
                        <Text>Null</Text>
                      )}
                    </VStack>
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Center>
                    <VStack>
                      {privateQuestionSets ? (
                        privateQuestionSets?.QuestionSets.map(
                          (questionSet, index) => {
                            return (
                              <QuestionSetListItem
                                private={questionSet.private}
                                questions={questionSet.questions}
                                title={questionSet.title}
                                key={index}
                              />
                            );
                          }
                        )
                      ) : (
                        <Text>No question sets found.</Text>
                      )}
                    </VStack>
                  </Center>
                </TabPanel>
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Center>
    </>
  );
}
