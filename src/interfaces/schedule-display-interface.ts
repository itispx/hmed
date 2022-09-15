import ScheduleInterface from "./schedule-interface";

interface ScheduleDisplayInterface extends ScheduleInterface {
  taken: boolean;
  title?: string;
}

export default ScheduleDisplayInterface
