import { SessionModel } from "../models";

const sessions: Array<SessionModel> = [
  {
    id: 1,
    name: "Morning Portsmouth",
    date: new Date(2022, 5, 17),
    rounds: [],
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
