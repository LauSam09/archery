import { DistanceUnit } from "../../models";

export type DistanceProps = {
  value: number;
  unit: DistanceUnit;
};

export function Distance(props: DistanceProps) {
  const { value, unit } = props;

  switch (unit) {
    case DistanceUnit.Metres:
      return <span>{value}m</span>;
    case DistanceUnit.Yards:
      return <span>{value}yds</span>;
  }
}
