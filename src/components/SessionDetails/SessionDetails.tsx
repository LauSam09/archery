import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSession } from "../../data";
import { SessionModel } from "../../models";

type SessionParams = {
  sessionId: string;
};

type SessionViewModel = {
  total: number;
  maximum: number;
  rounds: Array<RoundViewModel>;
};

type RoundViewModel = {
  displayName: string;
  total: number;
  ends: Array<EndViewModel>;
};

type EndViewModel = {
  displayName: string;
  scores: Array<number | string>;
  total: number;
  runningTotal: number;
};

function getSessionViewModel(model: SessionModel): SessionViewModel {
  let roundViewModels: Array<RoundViewModel> = [];
  let sessionTotal = 0;

  for (let i = 0; i < model.rounds.length; i++) {
    const round = model.rounds[i];
    const endViewModels: Array<EndViewModel> = [];

    let roundTotal = 0;
    for (let i = 0; i < round.ends.length; i++) {
      const endTotal = round.ends[i].scores.reduce((prev, curr) => {
        return Number.isInteger(curr)
          ? (prev as number) + (curr as number)
          : (prev as number) + 9; // TODO need to handle metric
      }, 0) as number; // TODO investigate alternative to casting

      roundTotal += endTotal;

      const endViewModel: EndViewModel = {
        displayName: `${i + 1}`,
        scores: round.ends[i].scores,
        total: endTotal,
        runningTotal: roundTotal,
      };
      endViewModels.push(endViewModel);
    }

    const roundViewModel: RoundViewModel = {
      displayName: `Round ${i + 1} - ${round.face} ${round.distance}${
        round.distanceUnit
      }`,
      total: roundTotal,
      ends: endViewModels,
    };
    roundViewModels.push(roundViewModel);
    sessionTotal += roundTotal;
  }

  return {
    total: sessionTotal,
    maximum:
      roundViewModels
        .flatMap((round) => round.ends)
        .flatMap((end) => end.scores).length * 9,
    rounds: roundViewModels,
  };
}

export function SessionDetails() {
  const { sessionId } = useParams<SessionParams>();
  const [session, setSession] = useState<SessionModel>();

  useEffect(() => {
    setTimeout(() => getSession(+(sessionId ?? "")).then(setSession), 500);
  }, [sessionId]);

  if (!session) {
    return <div>Loading placeholder</div>;
  }

  const viewModel = getSessionViewModel(session);

  return (
    <Box>
      <Stack>
        <FormControl>
          <FormLabel htmlFor="session-name">Name</FormLabel>
          <Input id="session-name" value={session.name} readOnly />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="session-date">Date</FormLabel>
          <Input value={session.date.toLocaleDateString()} readOnly />
        </FormControl>

        <Stack direction="row">
          <FormControl>
            <FormLabel htmlFor="session-total">Total</FormLabel>
            <Input
              value={`${viewModel.total} / ${viewModel.maximum}`}
              readOnly
            />
          </FormControl>
        </Stack>

        {viewModel.rounds.length === 0 ? (
          <Text>No rounds in session</Text>
        ) : (
          <Accordion allowMultiple allowToggle>
            {viewModel.rounds.map((round, i) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text>{round.displayName}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {round.ends.length === 0 ? (
                    <Text>No ends in round</Text>
                  ) : (
                    <TableContainer>
                      <Table variant="striped" size="sm">
                        <Thead>
                          <Tr>
                            <Th>End</Th>
                            {round.ends[0].scores.map((_, i) => (
                              <Th key={i} isNumeric>
                                {i + 1}
                              </Th>
                            ))}
                            <Th isNumeric>Σ</Th>
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
                              <Td isNumeric>{end.total}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Stack>
    </Box>
  );
}
