import { dispatch } from "../../redux-store";
import {
  updateInitialize,
  addSchedule,
  removeSchedule,
} from "../../redux-store/redux-slices/schedules-slice";

import ScheduleInterface from "../../interfaces/schedule-interface";
import StateQueryResponseInterface from "../../interfaces/state-query-response-interface";

export function updateInitializeStateQuery(
  value: boolean
): StateQueryResponseInterface {
  return dispatch(updateInitialize({ value }));
}

export function addScheduleStateQuery(
  item: ScheduleInterface
): StateQueryResponseInterface {
  return dispatch(addSchedule({ item }));
}

export function removeScheduleStateQuery(
  id: string
): StateQueryResponseInterface {
  return dispatch(removeSchedule({ id }));
}
