import _ from 'lodash';
import axios from 'axios';

import logger from '../../utils/logger';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getMeetupEvents = async (meetupUrls) => {
  const results = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < meetupUrls.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await wait(500);
    // eslint-disable-next-line no-await-in-loop
    const data = await axios.get(meetupUrls[i])
      .then((response) => {
        return response.data;
      })
      .catch((err) => logger.error(`Failed to fetch events from url: ${meetupUrls[i]} with err: ${err}`));
    results.push(data);
  }
  return _.filter(results, result => !_.isEmpty(result));
};

export default getMeetupEvents;
