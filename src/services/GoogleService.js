import Promise from 'promise';
import nodemailer from 'nodemailer';
import moment from 'moment';
import fs from 'fs';

import { getToken, updateToken } from './MongoService';
import logger from '../utils/logger';

const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send',
];

export const authorize = async (oauth2Client) => (
  new Promise(async (resolve) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      include_granted_scopes: true,
      scope: scopes,
    });

    resolve(authUrl);
  })
);

export const saveToken = async (oauth2Client, code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  await updateToken(tokens);
};

export const refreshToken = async oauth2Client => {
  const { access_token, refresh_token } = await getToken();
  oauth2Client.setCredentials({ access_token, refresh_token });

  return new Promise((resolve, reject) => {
    oauth2Client.refreshAccessToken(async (err, tokens) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        logger.info('Token Refreshed');
        await updateToken(tokens);
        resolve(oauth2Client);
      }
    });
  });
};

export const sendMessage = async () => {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const { access_token, refresh_token, expiry_date } = await getToken();
  const content = fs.readFileSync('output.html');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL,
      clientId,
      clientSecret,
      refreshToken: refresh_token,
      accessToken: access_token,
      expires: expiry_date,
    },
  });
  transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: `[SYD][Meetups] Meetups of the week ${moment().startOf('week').format('DD/MM/YYYY')}`,
    html: content,
  });
};
