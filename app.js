import express from 'express';
import moment from 'moment';

import { connectMongo, dropAllTokens, insertToken } from './src/services/MongoService';
import generateMeetupHtml from './src/services/generateMeetupHtml';
import logger from './src/utils/logger';
import { authorize } from './src/services/GoogleService';

const app = express();

connectMongo(
  () => {
    logger.info('Database connection ready');
    app.listen(process.env.PORT || 3000, () => logger.info('Generator listening on port 3000!'));
  },
  (err) => {
    logger.error(err);
    process.exit(1);
  },
);


app.get('/generate', async (req, res) => {
  try {
    await generateMeetupHtml(moment().startOf('week').format('YYYY-MM-DD'));
    res.status(200).send("Successfully generated HTML page for this week's meetup");
  } catch (err) {
    res.status(500).send(`generate Meetup HTML Failed with error: ${err}`);
  }
});

app.get('/authorize', async (req, res) => {
  try {
    const authUrl = await authorize();
    res.status(200).send(`Authorize this app by visiting this url: ${authUrl}`);
  } catch (err) {
    res.status(500).send(`authorise user Failed with error: ${err}`);
  }
});

app.get('/oauth2callback', async (req, res) => {
  if (!req.query.code) {
    res.status(500).send('invalid token provided');
  }

  await dropAllTokens()
    .then(() => {
      logger.info('previous tokens deleted');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('failed to save token');
    });

  await insertToken(req.query.code)
    .then(() => {
      res.status(201).send('successfully saved token');
    })
    .catch(() => {
      res.status(500).send('failed to save token');
    });
});
