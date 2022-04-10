import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import { Session, Unit } from "../models";

const sessions: Session[] = [
  {
    id: "abc",
    distance: 40,
    distanceUnit: Unit.Yards,
    face: "122",
    sessionTimestamp: new Date(),
  },
  {
    id: "def",
    distance: 30,
    distanceUnit: Unit.Yards,
    face: "122",
    sessionTimestamp: new Date(),
  },
];

export const Sessions = () => {
  return (
    <Box>
      <Button component={Link} to="new">
        New
      </Button>
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id} component={Link} to={session.id}>
            <ListItemText>
              {session.sessionTimestamp.toLocaleDateString()} {session.distance}{" "}
              {session.distanceUnit}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
