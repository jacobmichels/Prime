import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import useWindowDimensions from "../Util/WindowDimensionHook";

export default function Game() {
  let { id }: any = useParams();
  let [fetching, setFetchingState] = useState<boolean>(true);

  const [questionText, setQuestionText] = useState("Question text");

  const {
    isOpen: colourIsOpen,
    onOpen: colourOnOpen,
    onClose: colourOnClose,
  } = useDisclosure();

  const {
    isOpen: infoIsOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();

  const canvasRef = useRef<CanvasDraw>(null);
  const [brushRadius, setBrushRadius] = useState(3);
  const [canvasDisabled, setCanvasDisabled] = useState(false);
  const [brushColour, setBrushColour] = useState("#444");

  const { height, width } = useWindowDimensions();

  const clearCanvas = () => {
    canvasRef.current?.clear();
  };

  const undoCanvas = () => {
    canvasRef.current?.undo();
  };

  const saveCanvas = () => {
    let drawingStr = canvasRef.current?.getSaveData();
    console.log(drawingStr);
    setCanvasDisabled(true);
  };

  const biggerBrush = () => {
    if (brushRadius === 40) {
      return;
    }

    setBrushRadius(brushRadius + 1);
  };

  const smallerBrush = () => {
    if (brushRadius === 1) {
      return;
    }
    setBrushRadius(brushRadius - 1);
  };

  const handleColourChange = (color: string) => {
    setBrushColour(color);
    colourOnClose();
  };

  useEffect(() => {
    const guidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!guidRegex.test(id)) {
      alert("bad guid");
      setFetchingState(false);
    }
  }, [id]);

  return (
    <>
      <Center h="100%">
        {fetching ? (
          <>
            <Text>Fetching game info...</Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              m={10}
            />
          </>
        ) : (
          <>
            <VStack>
              <Center>
                <Box
                  mt={3}
                  width="fit-content"
                  bg="purple.500"
                  borderRadius={25}
                  p={15}
                >
                  <Text>{questionText}</Text>
                </Box>
              </Center>

              <CanvasDraw
                brushRadius={brushRadius}
                canvasHeight={height - 0.2 * height}
                canvasWidth={width - 0.03 * width}
                disabled={canvasDisabled}
                ref={canvasRef}
                lazyRadius={0}
                brushColor={brushColour}
              />
              <Spacer />
              <HStack>
                <Button onClick={smallerBrush}>-</Button>
                <Text>{brushRadius}</Text>
                <Button onClick={biggerBrush}>+</Button>
                <Button onClick={colourOnOpen}>Change Colour</Button>
                <Button onClick={undoCanvas}>Undo</Button>
                <Button onClick={clearCanvas}>Clear</Button>
                <Button onClick={saveCanvas}>Done</Button>
                <Button>Game Info (drawer)</Button>
              </HStack>
            </VStack>
            <Drawer
              placement="bottom"
              isOpen={colourIsOpen}
              onClose={colourOnClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  <Center>Select Colour</Center>
                </DrawerHeader>
                <DrawerBody>
                  <Center>
                    <HStack>
                      <Button
                        colorScheme="red"
                        onClick={() => handleColourChange("#f14021")}
                      >
                        Red
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleColourChange("#f57e42")}
                      >
                        Orange
                      </Button>
                      <Button
                        colorScheme="yellow"
                        onClick={() => handleColourChange("#f5f242")}
                      >
                        Yellow
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() => handleColourChange("#42f54b")}
                      >
                        Green
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleColourChange("#42b3f5")}
                      >
                        Blue
                      </Button>
                      <Button
                        colorScheme="purple"
                        onClick={() => handleColourChange("#ad42f5")}
                      >
                        Purple
                      </Button>
                      <Button>Default</Button>
                    </HStack>
                  </Center>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Center>
    </>
  );
}
