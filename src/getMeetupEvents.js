import { reject, isEmpty, map } from 'lodash';
import buildRequest from './buildRequest';
import logger from './utils/logger';

const getMeetupEvents = async (meetupUrls) => {
  return Promise.all(map(meetupUrls, url => buildRequest(url)))
    .then((events) => reject(events, (event) => isEmpty(event)))
    .catch((err) => logger.error(`getMeetupEvents failed with err: ${err}`));
};

export default getMeetupEvents;
