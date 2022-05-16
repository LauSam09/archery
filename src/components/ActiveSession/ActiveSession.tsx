import {
  Box,
  Button,
  Center,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export function ActiveSession() {
  const [option, setOption] = useState("template");

  return (
    <Box>
      <Center>
        <RadioGroup value={option} onChange={setOption} p="4">
          <Stack direction="column">
            <Radio value="template">Standard round</Radio>
            <Radio value="custom">Custom round</Radio>
          </Stack>
        </RadioGroup>
      </Center>
      <Center p="4">
        <Stack direction="column">
          {option === "template" && (
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
          <Button>Start</Button>
        </Stack>
      </Center>
    </Box>
  );
}
