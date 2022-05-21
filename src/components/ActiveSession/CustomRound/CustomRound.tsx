import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addSession } from "../../../data";
import { MeasurementType } from "../../../models";
import { Action, NewSession } from "../reducer";

type Score = number | "X" | "M";

export type CustomRoundProps = {
  session: NewSession;
  dispatch: Dispatch<Action>;
};

export function CustomRound(props: CustomRoundProps) {
  const { session, dispatch } = props;
  const { name, rounds } = session;
  /* TODO Add arrows per end to custom form */
  const arrowsPerEnd = 6;
  const [scores, setScores] = useState<Array<number | "X">>([]);
  const navigate = useNavigate();

  const currentRoundNumber = rounds.length;
  const currentRound = rounds[currentRoundNumber - 1];
  const currentEnd = rounds[currentRoundNumber - 1].ends.length + 1;
  const endActive = scores.length < arrowsPerEnd;

  function addScore(score: Score) {
    const newScore = score === "M" ? 0 : score;
    setScores((scores) => [...scores, newScore]);
  }

  function removeLastScore() {
    if (scores.length > 0) {
      setScores((scores) => scores.slice(0, scores.length - 1));
    } else if (currentEnd > 1) {
      dispatch({ type: "remove-previous-end" });
      setScores(currentRound.ends[currentEnd - 2].scores);
    }
  }

  function nextEnd() {
    dispatch({
      type: "add-end",
      payload: { round: currentRoundNumber - 1, end: { scores } },
    });
    setScores([]);
  }

  async function endSession() {
    const addedSession = await addSession(session);
    localStorage.removeItem("active_session");
    navigate(`../${addedSession.id}`);
  }

  return (
    <Box>
      <HStack justify="space-between" mb="4">
        <Heading>{name}</Heading>
        <Button onClick={endSession}>End Session</Button>
      </HStack>
      <Box borderWidth="1px" borderRadius="lg" padding="4" mb="4">
        <HStack justify="space-between">
          <Text>
            Round {currentRoundNumber} End {currentEnd}
          </Text>
          <Button onClick={removeLastScore}>Undo</Button>
        </HStack>

        <TableContainer mb="4">
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                {[...Array(arrowsPerEnd)].map((_, i) => (
                  <Th key={i + 1}>{i + 1}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                {scores.map((score, i) => (
                  <Td key={i}>{score === 0 ? "M" : score}</Td>
                ))}
                {[...Array(6 - scores.length)].map((_, i) => (
                  <Td key={i}>-</Td>
                ))}
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {endActive ? (
          <Wrap spacing={4} justify="center" pt="2" pb="2">
            {currentRound.scoring === MeasurementType.Imperial ? (
              <>
                {["X", 9, 7, 5, 3, 1, "M"].map((score) => (
                  <WrapItem key={score}>
                    <Button
                      padding="5"
                      onClick={() => addScore(score as Score)}
                    >
                      {score}
                    </Button>
                  </WrapItem>
                ))}
              </>
            ) : (
              <>
                {["X", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, "M"].map((score) => (
                  <WrapItem key={score}>
                    <Button
                      padding="5"
                      onClick={() => addScore(score as Score)}
                    >
                      {score}
                    </Button>
                  </WrapItem>
                ))}
              </>
            )}
          </Wrap>
        ) : (
          <ButtonGroup>
            <Button onClick={nextEnd}>Next End</Button>
          </ButtonGroup>
        )}
      </Box>

      <Accordion>
        {rounds.map((round, i) => (
          <AccordionItem key={i}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Round {i + 1}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="striped" size="sm">
                  <Thead>
                    <Tr>
                      <Th>End</Th>
                      {/* TODO Add arrows per end to custom form */}
                      {[1, 2, 3, 4, 5, 6].map((arrow) => (
                        <Th key={arrow} isNumeric>
                          {arrow}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {round.ends.map((end, i) => (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        {end.scores.map((score, i) => (
                          <Td key={i} isNumeric>
                            {score === 0 ? "M" : score}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
