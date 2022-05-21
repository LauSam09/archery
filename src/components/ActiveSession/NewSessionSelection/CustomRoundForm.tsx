import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";
import { Dispatch, FormEvent } from "react";

import { DistanceUnit, MeasurementType } from "../../../models";
import { Action } from "../reducer";

export type CustomRoundFormProps = {
  dispatch: Dispatch<Action>;
};

export function CustomRoundForm(props: CustomRoundFormProps) {
  const { dispatch } = props;

  const face = "122cm";
  const distanceUnit = DistanceUnit.Metres;
  const distance = 50;
  const scoring = MeasurementType.Metric;
  const date = new Date();
  const name = `${date.toLocaleDateString()} ${face} ${distance}${
    distanceUnit === DistanceUnit.Metres ? "m" : "yds"
  }`;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({
      type: "initialise-custom",
      customSession: {
        name,
        date,
        firstRound: { face, scoring, distance, distanceUnit },
      },
    });
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl>
            <FormLabel htmlFor="session-name">Name</FormLabel>
            <Input id="session-name" value={name} readOnly />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="session-distance">Distance</FormLabel>
            <Stack direction="row">
              <NumberInput
                id="session-distance"
                value={distance}
                step={5}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Select value={distanceUnit}>
                <option value={DistanceUnit.Metres}>Metres</option>
                <option value={DistanceUnit.Yards}>Yards</option>
              </Select>
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="session-face">Face</FormLabel>
            <Select id="session-face">
              <option value={face}>{face}</option>
            </Select>
          </FormControl>
          <FormLabel htmlFor="session-scoring">Scoring</FormLabel>
          <Select id="session-scoring" value={scoring}>
            <option value={MeasurementType.Metric}>Metric (10 zone)</option>
            <option value={MeasurementType.Imperial}>Imperial (5 zone)</option>
          </Select>
          <FormControl></FormControl>

          <FormControl>
            <FormLabel htmlFor="session-date">Date</FormLabel>
            <Input
              id="session-date"
              value={date.toLocaleDateString()}
              readOnly
            />
          </FormControl>

          <Button type="submit">Start</Button>
        </Stack>
      </form>
    </Box>
  );
}
