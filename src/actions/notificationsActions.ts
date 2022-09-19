import * as Notifications from "expo-notifications";

import ScheduleInterface from "../interfaces/schedule-interface";

export async function addScheduleNotificationAction(schedule: {
  id: string;
  time: string;
  name: string;
  quantity: number;
  days: number[];
}): Promise<ScheduleInterface> {
  const ids = [];

  for (let i = 0; i < schedule.days.length; i++) {
    const hour = parseInt(schedule.time.substring(0, 2));
    // Send notification 5 minutes before
    let minute = parseInt(schedule.time.substring(3, 6));

    if (minute === 0) {
      minute = 55;
    } else if (minute < 5) {
      minute = 60 - minute;
    } else {
      minute = minute - 5;
    }

    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicação próxima",
        body: `${schedule.name}, ${schedule.quantity}mg - ${schedule.time}`,
      },
      trigger: {
        weekday: schedule.days[i],
        hour,
        minute,
        repeats: true,
      },
    });

    ids.push(notificationID);
  }

  return {
    id: schedule.id,
    time: schedule.time,
    name: schedule.name,
    quantity: schedule.quantity,
    days: schedule.days,
    notificationIDs: ids,
  };
}

export async function removeScheduleNotificationAction(id: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id);
}
