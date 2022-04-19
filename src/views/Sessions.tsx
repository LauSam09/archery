import { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { Session } from "../models";
import { db } from "../config";

export const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>();

  useEffect(() => {
    async function loadSessions() {
      const querySnapshot = await getDocs(collection(db, "sessions"));
      const tmpSessions = querySnapshot.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      })) as unknown as Session[];
      setSessions(tmpSessions);
    }

    loadSessions();
  }, []);

  return (
    <Box>
      <Button component={Link} to="new">
        New
      </Button>
      <List>
        {sessions?.map((session) => (
          <ListItem
            key={session.id}
            component={Link}
            to={`${session.id}/active`}
          >
            <ListItemText>
              {new Date(session.sessionTimestamp).toLocaleDateString()}{" "}
              {session.distance}
              {session.distanceUnit}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
