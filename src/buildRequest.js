import axios from 'axios';
import logger from './utils/logger';

const buildRequest = (groupName) =>
  axios.get(`https://api.meetup.com/${groupName}/events`)
    .then((response) => response.data)
    .catch(() => logger.error(`Failed to fetch events for group: ${groupName}`));

export default buildRequest;
