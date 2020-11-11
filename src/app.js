import express from 'express';
import moment from 'moment';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import OAuth2Client from './utils/OAuth2Client';
import { generateMeetupHtml } from './services/ContentService';
import {
  authorize, saveToken, refreshToken, sendMessage,
} from './services/GoogleService';
import {
  getMeetupGroups, addNewGroup,
} from './services/MeetupGroupService';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: 'https://meetup-tw-sydney.herokuapp.com',
  optionsSuccessStatus: 200,
};

app.post('/generate', cors(corsOptions), async (req, res) => {
  try {
    const { date } = req.body;
    await generateMeetupHtml(moment(date, 'DD/MM/YYYY').startOf('week').format('YYYY-MM-DD'));
    res.sendFile(path.join(`${__dirname}/services/funcs/output.html`));
  } catch (err) {
    res.status(500).send(`generate content failed with error: ${err}`);
  }
});

app.get('/groups', async (req, res) => {
  try {
    const groups = await getMeetupGroups();
    res.status(200).send({ groups });
  } catch (err) {
    res.status(500).send(`failed to get Meetu Groups with error: ${err}`);
  }
});

app.post('/groups', async (req, res) => {
  try {
    const { groupName } = req.body;
    await addNewGroup(groupName);
    const groups = await getMeetupGroups();
    res.status(200).send({ groups });
  } catch (err) {
    res.status(500).send(`failed to get Meetup Groups with error: ${err}`);
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
    await saveToken(OAuth2Client, req.query.code);
    res.status(200).send('successfully saved token');
  } catch (err) {
    res.status(500).send('failed to save token');
  }
});
