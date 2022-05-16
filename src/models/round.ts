import { DistanceUnit } from "./distance-unit";
import { End } from "./end";
import { MeasurementType } from "./measurement-type";

export interface Round {
  face: string;
  scoring: MeasurementType;
  distance: number;
  distanceUnit: DistanceUnit;
  ends: Array<End>;
}
