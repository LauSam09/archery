import { useEffect, useState } from "react";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Session } from "../models";
import { db } from "../config";

export const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>();

  // TODO move auth checking higher
  useEffect(() => {
    async function loadSessions() {
      const sessionQuery = query(
        collection(db, "sessions"),
        where("userId", "==", auth?.currentUser?.uid)
      );

      const querySnapshot = await getDocs(sessionQuery);
      const tmpSessions = querySnapshot.docs.map((d) => ({
        ...d.data(),
        id: d.id,
      })) as unknown as Session[];
      setSessions(tmpSessions);
    }

    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      user && loadSessions();
    });
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
