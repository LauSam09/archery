import { Box, Divider, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { SessionModel } from "../../models";

const sessions: Array<SessionModel> = [
  { id: 1, name: "Morning Portsmouth", date: new Date(2022, 5, 17) },
  { id: 2, name: "Afternoon Western", date: new Date(2022, 5, 19) },
  { id: 3, name: "Evening Practice", date: new Date(2022, 5, 16) },
  { id: 4, name: "National", date: new Date(2022, 5, 15) },
  { id: 5, name: "WA Evening", date: new Date(2022, 5, 20) },
];

export function Sessions() {
  if (sessions.length === 0) {
    return <Text>No sessions recorded yet</Text>;
  }

  const orderedSessions = sessions.sort((s1, s2) =>
    s1.date < s2.date ? 1 : -1
  );

  return (
    <ul>
      {orderedSessions.map((s) => (
        <li key={s.id}>
          <Link as={RouterLink} to={`${s.id}`}>
            <Box p="4">
              <Text>{s.name}</Text>
              <Text>{s.date.toLocaleDateString()}</Text>
            </Box>
          </Link>
          <Divider />
        </li>
      ))}
    </ul>
  );
}
