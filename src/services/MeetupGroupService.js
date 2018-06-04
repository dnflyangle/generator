import mongoose from 'mongoose';
import { isEmpty, map } from 'lodash';
import axios from 'axios';
import logger from '../utils/logger';
import MEETUP_GROUP_NAMES from '../constants/MeetupGroupNames';

const meetupGroupSchema = mongoose.Schema({
  office: String,
  groupName: String,
});

const MeetupGroup = mongoose.model('MeetupGroup', meetupGroupSchema);

export const getMeetupGroups = async () => {
  return MeetupGroup.find({ office: 'Sydney' }).exec()
    .then(groups => map(groups, group => group.groupName))
    .catch(err => {
      logger.error('unable to retrieve meetup groups from database ', err);
      throw new Error('unable to retrieve meetup groups from database');
    });
};

export const getMeetupGroup = async (groupName) => {
  return MeetupGroup.find({ office: 'Sydney', groupName }).exec()
    .then(groups => map(groups, group => group.groupName))
    .catch(err => {
      logger.error('unable to retrieve meetup groups from database ', err);
      throw new Error('unable to retrieve meetup groups from database');
    });
};

const fetchGroup = async (groupName) => {
  return axios.get(`https://api.meetup.com/${groupName}`)
    .catch(err => {
      logger.error(`Unable to fetch info from Meetup.com for new group: ${groupName} with error: ${err}`);
      throw new Error(`Unable to fetch info from Meetup.com for new group: ${groupName}`);
    });
};

export const addNewGroup = async (groupName) => {
  const existingGroups = await getMeetupGroup(groupName);
  if (!isEmpty(existingGroups)) {
    throw new Error(`group: ${groupName} already exist`);
  } else {
    await fetchGroup(groupName);
    return MeetupGroup.create({ office: 'Sydney', groupName })
      .then(() => {
        logger.info(`successfully added group: ${groupName}`);
      })
      .catch(err => {
        logger.error(`unable to add group: ${groupName} with error:`, err);
        throw new Error(`unable to add group: ${groupName}`);
      });
  }
};

export const removeGroup = async (groupName) => {
  return MeetupGroup.deleteMany({ office: 'Sydney', groupName })
    .then(() => {
      logger.info(`successfully deleted group: ${groupName}`);
    })
    .catch(err => {
      logger.error(`unable to delete group: ${groupName} with error:`, err);
      throw new Error(`unable to delete group: ${groupName}`);
    });
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
