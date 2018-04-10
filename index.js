import buildMeetupUrls from './src/buildMeetupUrls';
import getMeetupEvents from './src/getMeetupEvents';
import filterEvents from './src/filterEvents';
import groupEvents from './src/groupEvents';

const main = async () => {
  const meetupUrls = buildMeetupUrls();

  const events = await getMeetupEvents(meetupUrls);

  const filteredEvents = filterEvents(events, '2018-04-08', '2018-04-14');

  groupEvents(filteredEvents, '2018-04-08');
};

main();

