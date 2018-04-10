import { forEach } from 'lodash';
import moment from 'moment';

const eventsByDayOfWeek = (startDateOfWeek) => {
  const events = {};
  forEach(
    [0, 1, 2, 3, 4],
    (day) => {
      events[moment(startDateOfWeek).add(day, 'days').format('dddd DD/MM/YYYY')] = {};
    },
  );
  return events;
};

const groupEvents = (events, startDateOfWeek) => {
  const eventsByDay = eventsByDayOfWeek(startDateOfWeek);
  forEach(events, event => {
    const date = moment(event.date).format('dddd DD/MM/YYYY');
    const time = moment(event.time, 'hh:mm').format('h:mm a');
    const eventOnDateTime = eventsByDay[date][time];
    if (!eventOnDateTime) {
      eventsByDay[date][time] = [];
    }
    eventsByDay[date][time].push(event);
  });
  return eventsByDay;
};

export default groupEvents;
