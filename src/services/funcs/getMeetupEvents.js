import axios from 'axios';

import logger from '../../utils/logger';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getMeetupEvents = async (meetupUrls) => {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < meetupUrls.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await wait(500);
    // eslint-disable-next-line no-await-in-loop
    const data = await axios.get(meetupUrls[i])
      .then((response) => response.data)
      .catch((err) => logger.error(`Failed to fetch events from url: ${meetupUrls[i]} with err: ${err}`));
    result.push(data);
  }
  return result;
};

export default getMeetupEvents;
