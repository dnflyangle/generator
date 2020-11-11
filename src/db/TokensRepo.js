/* eslint-disable camelcase */
import { query } from './index';

export const getTokenFromDB = async (office) => {
  const { rows } = await query('SELECT * FROM tokens WHERE office = $1', [office]);

  return rows;
};

export const updateTokenToDB = async (office, token) => {
  const {
    access_token,
    refresh_token,
    token_type,
    expiry_date,
  } = token;
  const { rows } = await query(
    'update tokens set access_token=$2, refresh_token=$3, token_type=$4, expiry_date=$5 where office=$1',
    [office, access_token, refresh_token, token_type, expiry_date],
  );

  return rows;
};
