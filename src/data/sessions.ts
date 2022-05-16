import { DistanceUnit, MeasurementType, SessionModel } from "../models";

const sessions: Array<SessionModel> = [
  {
    id: 1,
    name: "Morning Portsmouth",
    date: new Date(2022, 5, 17),
    rounds: [
      {
        ends: [{ scores: [9, 5, 0] }, { scores: [3, 5, 9] }],
        face: "122cm",
        scoring: MeasurementType.Imperial,
        distance: 60,
        distanceUnit: DistanceUnit.Yards,
      },
      {
        ends: [{ scores: [5, 1, "X"] }],
        face: "122cm",
        scoring: MeasurementType.Imperial,
        distance: 50,
        distanceUnit: DistanceUnit.Yards,
      },
      {
        ends: [{ scores: [9, 5, 0] }, { scores: [3, 5, 9] }],
        face: "122cm",
        scoring: MeasurementType.Imperial,
        distance: 40,
        distanceUnit: DistanceUnit.Yards,
      },
    ],
  },
  { id: 2, name: "Afternoon Western", date: new Date(2022, 5, 19), rounds: [] },
  { id: 3, name: "Evening Practice", date: new Date(2022, 5, 16), rounds: [] },
  { id: 4, name: "National", date: new Date(2022, 5, 15), rounds: [] },
  { id: 5, name: "WA Evening", date: new Date(2022, 5, 20), rounds: [] },
];

export async function getSessions() {
  return sessions;
}

export async function getSession(id: number) {
  return sessions.find((s) => s.id === id);
}
