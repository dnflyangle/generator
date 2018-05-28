import { flatten, filter, map, uniqBy } from 'lodash';
import moment from 'moment';
import logger from '../../../src/utils/logger';

const filterEvents = (events, startDateOfWeek) => {
  const startDate = moment(startDateOfWeek);
  const endDate = moment(startDateOfWeek).add(6, 'days');
  logger.info(startDate);
  logger.info(endDate);

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
