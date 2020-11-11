import { isEmpty, pick } from 'lodash';
import axios from 'axios';
import logger from '../utils/logger';
import { getGroupsByOfficeFromDB, getGroupFromDB, addGroupToDB } from '../db/MeetupGroupsRepo';

export const getMeetupGroups = async () => {
  const groups = await getGroupsByOfficeFromDB('sydney');
  return pick(groups, ['group_name']);
};

export const getMeetupGroup = async (groupName) => {
  const existingGroup = await getGroupFromDB('sydney', groupName);
  return pick(existingGroup, ['group_name']);
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
    return addGroupToDB('sydney', groupName);
  }
};
