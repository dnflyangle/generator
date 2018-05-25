import mongoose from 'mongoose';
import { isEmpty } from 'lodash';
import logger from '../utils/logger';
import MEETUP_GROUP_NAMES from '../constants/MeetupGroupNames';

const meetupGroupSchema = mongoose.Schema({
  office: String,
  groupName: String,
});

const MeetupGroup = mongoose.model('MeetupGroup', meetupGroupSchema);

export const getMeetupGroups = async () => {
  return MeetupGroup.findOne({ office: 'Sydney' }).exec();
};

export const seedMeetupGroups = async () => {
  const existingGroups = await getMeetupGroups();
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
