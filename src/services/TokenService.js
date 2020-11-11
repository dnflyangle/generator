import isEmpty from 'lodash/isEmpty';
import { getTokenFromDB, updateTokenToDB } from '../db/TokensRepo';

export const updateToken = (token) => {
  return updateTokenToDB('sydney', token);
};

export const getToken = async () => {
  const row = getTokenFromDB('sydney');
  return isEmpty(row) ? {} : row[0];
};
