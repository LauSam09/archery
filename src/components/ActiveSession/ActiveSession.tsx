import { useEffect, useReducer } from "react";
import { CustomRound } from "./CustomRound";

import { NewSessionSelection } from "./NewSessionSelection";
import { reducer, initialState, Stage, State } from "./reducer";

export function ActiveSession() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { session, stage } = state;

  useEffect(() => {
    const serialisedState = localStorage.getItem("active_session");

    if (serialisedState) {
      const deserialisedState = JSON.parse(serialisedState) as State;
      deserialisedState.session.date = new Date(deserialisedState.session.date);
      dispatch({ type: "load-state", payload: deserialisedState });
    } else {
      dispatch({ type: "start-selection" });
    }
  }, []);

  useEffect(() => {
    session.rounds.length &&
      localStorage.setItem("active_session", JSON.stringify(state));
  }, [session]);

  switch (stage) {
    case Stage.Loading:
      return <div>Loading</div>;
    case Stage.Selection:
      return <NewSessionSelection dispatch={dispatch} />;
    case Stage.Custom:
      return <CustomRound session={session} dispatch={dispatch} />;
  }
}
