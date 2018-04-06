import { reject, isEmpty } from 'lodash';
import buildRequest from './buildRequest';
import buildMeetupUrls from './buildMeetupUrls';
import logger from './utils/logger';


const getMeetupEvents = async () => {
  const meetupUrls = buildMeetupUrls();
  return Promise.all(meetupUrls.map(url => buildRequest(url)))
    .then((events) => reject(events, (event) => isEmpty(event)))
    .catch((err) => logger.error(`getMeetupEvents failed with err: ${err}`));
};

export default getMeetupEvents;
