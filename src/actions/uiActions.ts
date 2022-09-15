import { selectScheduleDayStateQuery } from "../queries/local-state/uiQueries";

export function selectedScheduleDay(day: number) {
  return selectScheduleDayStateQuery(day);
}
