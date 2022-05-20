import { Box, Center, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Dispatch, useState } from "react";

import { Action } from "../reducer";
import { CustomRoundForm } from "./CustomRoundForm";
import { StandardRoundForm } from "./StandardRoundForm";

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
      <Center p="4">
        <Stack direction="column">
          {option === SessionType.Standard ? (
            <StandardRoundForm />
          ) : (
            <CustomRoundForm dispatch={dispatch} />
          )}
        </Stack>
      </Center>
    </Box>
  );
}
