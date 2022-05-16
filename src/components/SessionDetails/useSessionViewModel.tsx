import { ReactNode, useEffect, useState } from "react";
import { getSession } from "../../data";
import { MeasurementType, SessionModel } from "../../models";
import { Distance } from "../Distance";

export function useSessionViewModel(sessionId: string | undefined) {
  const [session, setSession] = useState<SessionModel>();

  useEffect(() => {
    sessionId !== undefined &&
      setTimeout(() => getSession(+sessionId).then(setSession), 500);
  }, [sessionId]);

  if (session) {
    return getSessionViewModel(session);
  } else {
    return;
  }
}

type SessionViewModel = {
  name: string;
  date: Date;
  total: number;
  maximum: number;
  rounds: Array<RoundViewModel>;
};

type RoundViewModel = {
  displayName: ReactNode;
  total: number;
  ends: Array<EndViewModel>;
  maximum: number;
};

type EndViewModel = {
  displayName: string;
  scores: Array<number | string>;
  total: number;
  runningTotal: number;
  maximum: number;
};

function getSessionViewModel(model: SessionModel): SessionViewModel {
  let roundViewModels: Array<RoundViewModel> = [];
  let sessionTotal = 0;

  for (let i = 0; i < model.rounds.length; i++) {
    const round = model.rounds[i];
    const endViewModels: Array<EndViewModel> = [];
    const maxArrowScore = round.scoring === MeasurementType.Imperial ? 9 : 10;

    let roundTotal = 0;
    for (let i = 0; i < round.ends.length; i++) {
      const endTotal = round.ends[i].scores.reduce((prev, curr) => {
        return Number.isInteger(curr)
          ? (prev as number) + (curr as number)
          : (prev as number) + maxArrowScore;
      }, 0) as number; // TODO investigate alternative to casting

      roundTotal += endTotal;

      const endViewModel: EndViewModel = {
        displayName: `${i + 1}`,
        scores: round.ends[i].scores,
        total: endTotal,
        runningTotal: roundTotal,
        maximum: round.ends[i].scores.length * maxArrowScore,
      };
      endViewModels.push(endViewModel);
    }

    const roundViewModel: RoundViewModel = {
      displayName: (
        <>
          {`Round ${i + 1} - ${round.face} `}
          <Distance value={round.distance} unit={round.distanceUnit} />
        </>
      ),
      total: roundTotal,
      ends: endViewModels,
      maximum: endViewModels.reduce((prev, curr) => prev + curr.maximum, 0),
    };
    roundViewModels.push(roundViewModel);
    sessionTotal += roundTotal;
  }

  return {
    name: model.name,
    date: model.date,
    total: sessionTotal,
    maximum: roundViewModels.reduce((prev, curr) => prev + curr.maximum, 0),
    rounds: roundViewModels,
  };
}
