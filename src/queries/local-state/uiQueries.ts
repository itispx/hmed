import { dispatch } from "../../redux-store";
import { selectScheduleDay } from "../../redux-store/redux-slices/ui-slice";

import StateQueryResponseInterface from "./state-query-response-interface";

export function selectScheduleDayStateQuery(
  index: number
): StateQueryResponseInterface {
  return dispatch(selectScheduleDay({ index }));
}
