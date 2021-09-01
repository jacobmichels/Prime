import { Center, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Game() {
  let { id }: any = useParams();
  let [fetching, setFetchingState] = useState<boolean>(true);

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
          <Text>Done fetching</Text>
        )}
      </Center>
    </>
  );
}
