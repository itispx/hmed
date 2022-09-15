import ScheduleInterface from "./schedule-interface";

interface ScheduleDisplay extends ScheduleInterface {
  taken: boolean;
  title?: string;
}

export default ScheduleDisplay;
