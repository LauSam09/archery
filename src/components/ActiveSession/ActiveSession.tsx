import { useEffect, useReducer } from "react";

import { NewSessionSelection } from "./NewSessionSelection";
import { reducer, initialState, Stage } from "./reducer";

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
