interface ScheduleInterface {
  id: string;
  notificationIDs: string[];
  time: string;
  name: string;
  quantity: number;
  days: number[];
}

export default ScheduleInterface;
