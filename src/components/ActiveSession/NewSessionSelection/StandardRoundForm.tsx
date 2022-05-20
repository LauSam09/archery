import { Stack, Select, Button } from "@chakra-ui/react";

export function StandardRoundForm() {
  return (
    <form>
      <Stack>
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

        <Button disabled>Start</Button>
      </Stack>
    </form>
  );
}
