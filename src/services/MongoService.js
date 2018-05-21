import mongoose from 'mongoose';
import logger from '../utils/logger';

const tokenSchema = mongoose.Schema({
  access_token: String,
  refresh_token: String,
  token_type: String,
  expiry_date: Number,
});

const Token = mongoose.model('Token', tokenSchema);

export const connectMongo = async (success, failure) => {
  await mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
    .then(success)
    .catch(failure);
};

export const dropAllTokens = async () => {
  return Token.remove({})
    .then(() => {
      logger.info('previous tokens deleted');
    })
    .catch(err => {
      logger.error('unable to remove previous token ', err);
      throw new Error('unable to remove previous token');
    });
};

export const insertToken = (token) => {
  const newToken = new Token(token);
  return newToken.save()
    .then(() => {
      logger.info('successfully saved token');
    })
    .catch(err => {
      logger.error('unable to save token ', err);
      throw new Error('unable to save token');
    });
};

export const getToken = () => {
  return Token.findOne({}).exec()
    .then((token) => {
      return token;
    })
    .catch(err => {
      logger.error('unable to get token ', err);
      throw new Error('unable to get token');
    });
};
