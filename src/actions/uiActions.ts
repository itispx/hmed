import { selectScheduleDayStateQuery } from "../queries/local-state/uiQueries";

const uiActions = (() => {
  return {
    selectedScheduleDay,
  };
})();

function selectedScheduleDay(day: number) {
  return selectScheduleDayStateQuery(day);
}

export default uiActions;
