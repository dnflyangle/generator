import { reject, isEmpty, map } from 'lodash';
import axios from 'axios';

import logger from '../../utils/logger';

const buildRequest = (groupUrl) => axios.get(groupUrl)
  .then((response) => response.data)
  .catch((err) => logger.error(`Failed to fetch events from url: ${groupUrl} with err: ${err}`));

const getMeetupEvents = async (meetupUrls) => {
  return Promise.all(map(meetupUrls, url => buildRequest(url)))
    .then((events) => reject(events, (event) => isEmpty(event)))
    .catch((err) => logger.error(`getMeetupEvents failed with err: ${err}`));
};

export default getMeetupEvents;
