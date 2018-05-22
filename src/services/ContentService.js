import MEETUP_GROUP_NAMES from '../constants/MeetupGroupNames';
import getMeetupEvents from './funcs/getMeetupEvents';
import filterEvents from './funcs/filterEvents';
import groupEvents from './funcs/groupEvents';
import templateContent from './funcs/templateContent';

export const buildMeetupUrls = () => MEETUP_GROUP_NAMES.map(groupName => `https://api.meetup.com/${groupName}/events`);

export const generateMeetupHtml = async (startDateOfWeek) => {
  const meetupUrls = buildMeetupUrls();
  const events = await getMeetupEvents(meetupUrls);
  const filteredEvents = filterEvents(events, startDateOfWeek);
  const groupedEvents = groupEvents(filteredEvents, startDateOfWeek);
  templateContent(groupedEvents);
};
