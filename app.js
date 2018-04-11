import express from 'express';
import moment from 'moment';

import generateMeetupHtml from './src/services/generateMeetupHtml';
import logger from './src/utils/logger';

const app = express();

app.get('/generate', async (req, res) => {
  try {
    await generateMeetupHtml(moment().startOf('week').format('YYYY-MM-DD'));
    res.status(200).send("Successfully generated HTML page for this week's meetup");
  } catch (err) {
    res.status(500).send(`generate Meetup HTML Failed with error: ${err}`);
  }
});

app.listen(3000, () => logger.info('Generator listening on port 3000!'));
