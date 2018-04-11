import axios from 'axios';
import logger from '../../utils/logger';

const buildRequest = (groupUrl) =>
  axios.get(groupUrl)
    .then((response) => response.data)
    .catch((err) => logger.error(`Failed to fetch events from url: ${groupUrl} with err: ${err}`));

export default buildRequest;
