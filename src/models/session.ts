import { Round } from "./round";

export interface SessionModel {
  id: number;
  name: string;
  date: Date;
  rounds: Array<Round>;
}
