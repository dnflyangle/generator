import mongoose from 'mongoose';
import logger from '../utils/logger';

const tokenSchema = mongoose.Schema({
  office: String,
  author: String,
  access_token: String,
  refresh_token: String,
  token_type: String,
  expiry_date: Number,
});

const Token = mongoose.model('Token', tokenSchema);

export const updateToken = (token) => {
  const newToken = { ...token, office: 'Sydney', author: 'Issy' };
  return Token.update({ office: 'Sydney' }, newToken, { upsert: true })
    .then(() => {
      logger.info('successfully saved token');
    })
    .catch(err => {
      logger.error('unable to save token ', err);
      throw new Error('unable to save token');
    });
};

export const getToken = () => {
  return Token.findOne({ office: 'Sydney' }).exec()
    .then((token) => {
      return token;
    })
    .catch(err => {
      logger.error('unable to get token ', err);
      throw new Error('unable to get token');
    });
};
