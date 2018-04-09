import buildMeetupUrls from './src/buildMeetupUrls';
import getMeetupEvents from './src/getMeetupEvents';
import filterEvents from './src/filterEvents';

const main = async () => {
  const meetupUrls = buildMeetupUrls();

  const events = await getMeetupEvents(meetupUrls);

  filterEvents(events);
};

main();

