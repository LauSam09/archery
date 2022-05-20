import {
  Box,
  Button,
  Center,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";

import { Action } from "./reducer";

export enum SessionType {
  Standard = "Standard",
  Custom = "Custom",
}

export type NewSessionSelectionProps = {
  dispatch: Dispatch<Action>;
};

export function NewSessionSelection(props: NewSessionSelectionProps) {
  const { dispatch } = props;
  const [option, setOption] = useState(SessionType.Standard);

  function handleChange(nextValue: string) {
    setOption(nextValue as SessionType);
  }

  function handleClick() {
    switch (option) {
      case SessionType.Standard:
        dispatch({ type: "initialise-standard" });
        break;
      case SessionType.Custom:
        dispatch({ type: "initialise-custom" });
        break;
    }
  }

  return (
    <Box>
      <Center>
        <RadioGroup value={option} onChange={handleChange} p="4">
          <Stack direction="column">
            <Radio value={SessionType.Standard}>Standard round</Radio>
            <Radio value={SessionType.Custom}>Custom round</Radio>
          </Stack>
        </RadioGroup>
      </Center>
      {/* Consider form here */}
      <Center p="4">
        <Stack direction="column">
          {option === SessionType.Standard && (
            <Select placeholder="Select round">
              {[
                "York",
                "Hereford/Bristol 1",
                "Bristol II",
                "Bristol III",
                "Western",
              ].map((round) => (
                <option key={round}>{round}</option>
              ))}
            </Select>
          )}
          <Button
            disabled={option === SessionType.Standard}
            onClick={handleClick}
          >
            Start
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
