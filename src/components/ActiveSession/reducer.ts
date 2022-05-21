import { End, Round } from "../../models";

export type Action =
  | { type: "start-selection" }
  | {
      type: "initialise-custom";
      customSession: {
        name: string;
        date: Date;
        firstRound: Omit<Round, "ends">;
      };
    }
  | { type: "initialise-standard" }
  | { type: "add-end"; payload: { round: number; end: End } }
  | { type: "remove-previous-end" };

export interface NewSession {
  name: string;
  date: Date;
  rounds: Array<Round>;
}

export enum Stage {
  Loading,
  Selection,
  Standard,
  Custom,
}

export const initialState: State = {
  stage: Stage.Loading,
  session: { name: "", date: new Date(), rounds: [] },
};

export type State = {
  stage: Stage;
  session: NewSession;
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start-selection":
      return {
        ...state,
        stage: Stage.Selection,
      };
    case "initialise-custom":
      return {
        session: {
          ...action.customSession,
          rounds: [
            {
              ...action.customSession.firstRound,
              ends: [],
            },
          ],
        },
        stage: Stage.Custom,
      };
    case "add-end": {
      return {
        ...state,
        session: {
          ...state.session,
          rounds: state.session.rounds.map((round, i) => {
            if (i === action.payload.round) {
              return { ...round, ends: [...round.ends, action.payload.end] };
            } else {
              return { ...round };
            }
          }),
        },
      };
    }
    case "remove-previous-end": {
      return {
        ...state,
        session: {
          ...state.session,
          rounds: state.session.rounds.map((round, i) => {
            if (i === state.session.rounds.length - 1) {
              return {
                ...round,
                ends: round.ends.slice(0, round.ends.length - 1),
              };
            } else {
              return { ...round };
            }
          }),
        },
      };
    }
    default:
      return state;
  }
}
