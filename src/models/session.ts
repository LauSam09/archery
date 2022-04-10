import { Unit } from "./unit";

export interface Session {
  id: string;
  distance: number;
  distanceUnit: Unit;
  face: string;
  sessionTimestamp: Date;
}
