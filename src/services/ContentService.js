import { map } from 'lodash';

import getMeetupEvents from './funcs/getMeetupEvents';
import filterEvents from './funcs/filterEvents';
import groupEvents from './funcs/groupEvents';
import templateContent from './funcs/templateContent';
import { getMeetupGroups } from './MeetupGroupService';

export const buildMeetupUrls = async () => {
  const groups = await getMeetupGroups();
  return map(groups, group => `https://api.meetup.com/${group}/events`);
};

export const generateMeetup = async (startDateOfWeek) => {
  const meetupUrls = await buildMeetupUrls();
  const events = await getMeetupEvents(meetupUrls);
  const filteredEvents = filterEvents(events, startDateOfWeek);
  return groupEvents(filteredEvents, startDateOfWeek);
};
export const generateMeetupHtml = async (startDateOfWeek) => {
  const groupedEvents = await generateMeetup(startDateOfWeek);
  templateContent(groupedEvents);
};
