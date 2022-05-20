import { Round } from "../../models";

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
  | { type: "initialise-standard" };

export interface NewSession {
  name: string;
  date: Date;
  rounds: Array<Round>;
}

export enum Stage {
  Loading,
  Selection,
  Active,
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
        stage: Stage.Active,
      };
    default:
      return state;
  }
}