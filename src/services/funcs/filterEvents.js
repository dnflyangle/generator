import { flatten, filter, map, uniqBy } from 'lodash';
import moment from 'moment';

const filterEvents = (events, startDateOfWeek) => {
  const startDate = moment(startDateOfWeek);
  const endDate = moment(startDateOfWeek).add(6, 'days');

  const filteredEvents = filter(flatten(events), event =>
    moment(event.local_date).isSameOrAfter(startDate) &&
  moment(event.local_date).isSameOrBefore(endDate));

  return uniqBy(map(filteredEvents, event => ({
    eventName: event.name,
    date: event.local_date,
    time: event.local_time,
    groupName: event.group.name,
    link: event.link,
  })), 'link');
};

export default filterEvents;
