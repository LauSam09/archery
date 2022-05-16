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
  Skeleton,
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
import { useParams } from "react-router-dom";

import { useSessionViewModel } from "./useSessionViewModel";
import { Distance } from "../Distance";

type SessionParams = {
  sessionId: string;
};

export function SessionDetails() {
  const { sessionId } = useParams<SessionParams>();
  const viewModel = useSessionViewModel(sessionId);
  const isLoaded = !!viewModel;

  return (
    <Box>
      <Stack>
        <Skeleton isLoaded={isLoaded}>
          <FormControl>
            <FormLabel htmlFor="session-name">Name</FormLabel>
            <Input id="session-name" value={viewModel?.name} readOnly />
          </FormControl>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <FormControl>
            <FormLabel htmlFor="session-date">Date</FormLabel>
            <Input value={viewModel?.date.toLocaleDateString()} readOnly />
          </FormControl>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <Stack direction="row">
            <FormControl>
              <FormLabel htmlFor="session-total">Total</FormLabel>
              <Input
                value={`${viewModel?.total}/${viewModel?.maximum}`}
                readOnly
              />
            </FormControl>
          </Stack>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} minHeight={125}>
          <FormControl>
            <FormLabel>Rounds</FormLabel>
            {viewModel?.rounds.length === 0 ? (
              <Text>No rounds in session</Text>
            ) : (
              <Accordion allowMultiple allowToggle>
                {viewModel?.rounds.map((round, i) => (
                  <AccordionItem key={i}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text>
                            {round.displayName}{" "}
                            <Distance
                              value={round.distance}
                              unit={round.distanceUnit}
                            />{" "}
                            ({round.total}/{round.maximum})
                          </Text>
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
          </FormControl>
        </Skeleton>
      </Stack>
    </Box>
  );
}
