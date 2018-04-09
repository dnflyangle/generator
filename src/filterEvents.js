import { flatten, filter, map } from 'lodash';
import moment from 'moment';

const filterEvents = (events, startDate, endDate) => {
  const filteredEvents = filter(flatten(events), event =>
    moment(event.local_date).isSameOrAfter(moment(startDate)) &&
  moment(event.local_date).isSameOrBefore(endDate));

  return map(filteredEvents, event => ({
    eventName: event.name,
    date: event.local_date,
    time: event.local_time,
    groupName: event.group.name,
    link: event.link,
  }));
};

export default filterEvents;
