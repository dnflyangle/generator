import ejs from 'ejs';
import fs from 'fs';

import buildMeetupUrls from './funcs/buildMeetupUrls';
import getMeetupEvents from './funcs/getMeetupEvents';
import filterEvents from './funcs/filterEvents';
import groupEvents from './funcs/groupEvents';
import logger from '../utils/logger';

const generateMeetupHtml = async (startDateOfWeek) => {
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

export default generateMeetupHtml;
