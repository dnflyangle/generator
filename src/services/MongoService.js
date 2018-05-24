import mongoose from 'mongoose';
import { isEmpty } from 'lodash';
import logger from '../utils/logger';
import MEETUP_GROUP_NAMES from '../constants/MeetupGroupNames';

const tokenSchema = mongoose.Schema({
  office: String,
  author: String,
  access_token: String,
  refresh_token: String,
  token_type: String,
  expiry_date: Number,
});

const Token = mongoose.model('Token', tokenSchema);

const meetupGroupSchema = mongoose.Schema({
  office: String,
  groupName: String,
});

const MeetupGroup = mongoose.model('MeetupGroup', meetupGroupSchema);

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

export const seedMeetupGroups = async () => {
  const existingGroups = await MeetupGroup.findOne({ office: 'Sydney' }).exec();
  if (!isEmpty(existingGroups)) {
    return null;
  }

  const meetupGroups = MEETUP_GROUP_NAMES.map(groupName => ({ office: 'Sydney', groupName }));
  return MeetupGroup.create(meetupGroups)
    .then(() => {
      logger.info('successfully seed Meetup Groups');
    })
    .catch(err => {
      logger.error('unable to seed MeetupGroups ', err);
      throw new Error('unable to seed MeetupGroups');
    });
};
