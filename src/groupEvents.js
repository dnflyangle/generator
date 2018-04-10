import { forEach, findIndex, sortedIndexBy } from 'lodash';
import moment from 'moment';

const eventsByDayOfWeek = (startDateOfWeek) => {
  const events = [];
  forEach(
    [0, 1, 2, 3, 4, 5, 6],
    (day) => {
      const event = {
        date: moment(startDateOfWeek).add(day, 'days').format('dddd DD/MM/YYYY'),
        eventsByDate: [],
      };
      events.push(event);
    },
  );
  return events;
};

const groupEvents = (events, startDateOfWeek) => {
  const eventsByDay = eventsByDayOfWeek(startDateOfWeek);
  forEach(events, event => {
    const date = moment(event.date).format('dddd DD/MM/YYYY');
    const time = moment(event.time, 'hh:mm').format('h:mm a');
    const dateIndex = findIndex(eventsByDay, { date });
    const { eventsByDate } = eventsByDay[dateIndex];
    const timeIndex = sortedIndexBy(eventsByDate, { time }, 'time');
    const target = eventsByDate[timeIndex];
    if (target) {
      target.eventsByTime.push(event);
    } else {
      eventsByDate.push({
        time,
        eventsByTime: [event],
      });
    }
  });
  return eventsByDay;
};

export default groupEvents;
