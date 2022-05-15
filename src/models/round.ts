import { End } from "./end";

export interface Round {
  face: string;
  distance: number;
  distanceUnit: string;
  ends: Array<End>;
}
