import { Pool } from 'pg';
import logger from '../utils/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const getClient = async () => {
  const client = await pool.connect();
  const { query } = client;
  const { release } = client;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    logger.error('A client has been checked out for more than 5 seconds!');
    logger.error(`The last executed query on this client was: ${client.lastQuery}`);
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
};

export const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.info('executed query', {
    text,
    duration,
    rows: res.rowCount,
  });
  return res;
};
