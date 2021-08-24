import {
  Box,
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
    <Center mt={4}>
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
  }, []);

  return (
    <>
      <Navbar />
      <Center>
        <Box maxW="1000px" bg="purple.500" borderRadius={25} mt={10}>
          <Title />
          <Tabs mt={3} variant="solid-rounded">
            <Center width="500px">
              <TabList>
                <Tab>Everyone's</Tab>
                <Tab>Only Yours</Tab>
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
