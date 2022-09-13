import { dispatch } from "../../redux-store";
import {
  updateInitialize,
  addSchedule,
  removeSchedule,
} from "../../redux-store/redux-slices/schedules-slice";

export function updateInitializeStateQuery(value) {
  return dispatch(updateInitialize({ value }));
}

export function addScheduleStateQuery(item) {
  return dispatch(addSchedule({ item }));
}

export function removeScheduleStateQuery(id) {
  return dispatch(removeSchedule({ id }));
}
