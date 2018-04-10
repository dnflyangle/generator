import ejs from 'ejs';
import fs from 'fs';

import buildMeetupUrls from './src/buildMeetupUrls';
import getMeetupEvents from './src/getMeetupEvents';
import filterEvents from './src/filterEvents';
import groupEvents from './src/groupEvents';
import logger from './src/utils/logger';

const main = async (startDateOfWeek) => {
  const meetupUrls = buildMeetupUrls();

  const events = await getMeetupEvents(meetupUrls);

  const filteredEvents = filterEvents(events, startDateOfWeek);

  const groupedEvents = groupEvents(filteredEvents, startDateOfWeek);

  fs.readFile(`${__dirname}/emailTemplate.ejs`, 'utf8', (err, data) => {
    if (err) {
      logger.error(err);
    }
    const ejsString = data;
    const template = ejs.compile(ejsString);
    const html = template({ groupedEvents });
    fs.writeFile('output.html', html, (error) => {
      if (error) {
        logger.error(error);
      }
    });
  });
};

main('2018-04-08');
