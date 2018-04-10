import buildMeetupUrls from './src/buildMeetupUrls';
import getMeetupEvents from './src/getMeetupEvents';
import filterEvents from './src/filterEvents';
import groupEvents from './src/groupEvents';

const main = async (startDateOfWeek) => {
  const meetupUrls = buildMeetupUrls();

  const events = await getMeetupEvents(meetupUrls);

  const filteredEvents = filterEvents(events, startDateOfWeek);

  console.log(JSON.stringify(groupEvents(filteredEvents, startDateOfWeek)));
};

main('2018-04-08');

