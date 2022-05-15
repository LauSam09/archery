import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { getSessions } from "../../data";
import { SessionModel } from "../../models";

export function Sessions() {
  const [sessions, setSessions] = useState<Array<SessionModel>>();

  useEffect(() => {
    setTimeout(() => getSessions().then(setSessions), 500);
  }, []);

  if (!sessions) {
    return (
      <Stack>
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
        <Skeleton height="70px" />
      </Stack>
    );
  }

  if (sessions.length === 0) {
    return <Text>No sessions recorded yet</Text>;
  }

  const orderedSessions = sessions.sort((s1, s2) =>
    s1.date < s2.date ? 1 : -1
  );

  return (
    <List>
      {orderedSessions.map((s) => (
        <ListItem key={s.id}>
          <Link as={RouterLink} to={`${s.id}`}>
            <Box p="4">
              <Text>{s.name}</Text>
              <Text>{s.date.toLocaleDateString()}</Text>
            </Box>
          </Link>
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}
