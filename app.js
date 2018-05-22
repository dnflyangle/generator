import express from 'express';
import moment from 'moment';

import OAuth2Client from './src/utils/OAuth2Client';
import { connectMongo, dropAllTokens, insertToken } from './src/services/MongoService';
import { generateMeetupHtml } from './src/services/ContentService';
import { authorize, refreshToken, sendMessage } from './src/services/GoogleService';
import logger from './src/utils/logger';

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
    res.status(200).send('content generated, please check output.html');
  } catch (err) {
    res.status(500).send(`generate content failed with error: ${err}`);
  }
});

app.get('/email', async (req, res) => {
  try {
    await generateMeetupHtml(moment().startOf('week').format('YYYY-MM-DD'));
    await refreshToken(OAuth2Client);
    await sendMessage();
    res.status(200).send("Successfully generated HTML page for this week's meetup");
  } catch (err) {
    res.status(500).send(`generate email failed with error: ${err}`);
  }
});

app.get('/authorize', async (req, res) => {
  try {
    const authUrl = await authorize(OAuth2Client);
    res.status(200).send(`Authorize this app by visiting this url: ${authUrl}`);
  } catch (err) {
    res.status(500).send(`authorise user Failed with error: ${err}`);
  }
});

app.get('/oauth2callback', async (req, res) => {
  if (!req.query.code) {
    res.status(500).send('invalid token provided');
  }

  try {
    const { tokens } = await OAuth2Client.getToken(req.query.code);
    OAuth2Client.setCredentials(tokens);
    await dropAllTokens();
    await insertToken(tokens, req.query.code);
    res.status(201).send('successfully saved token');
  } catch (err) {
    res.status(500).send('failed to save token');
  }
});
