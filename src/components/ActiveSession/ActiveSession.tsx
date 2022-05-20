import { useEffect, useReducer } from "react";

import { NewSessionSelection } from "./NewSessionSelection";
import { reducer, initialState, Stage } from "./reducer";

// TODO: Split into `NewSession` on `/sessions/new` and `ActiveSession` on `/sessions/active`
// This will allow the back button to work more intuitively.
// Could use query params to initialise active session. Alternatively could look at Zustand.
// On `/new` can display warning if there is already an active session.

export function ActiveSession() {
  const [{ stage }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => dispatch({ type: "start-selection" }), 500);
  }, []);

  switch (stage) {
    case Stage.Loading:
      return <div>Loading</div>;
    case Stage.Selection:
      return <NewSessionSelection dispatch={dispatch} />;
    case Stage.Active:
      return <div>Active</div>;
  }
}
