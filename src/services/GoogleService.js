import Promise from 'promise';
import nodemailer from 'nodemailer';
import { getToken, insertToken } from './MongoService';
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

export const refreshToken = async oauth2Client => (
  new Promise((resolve, reject) => {
    oauth2Client.refreshAccessToken(async (err, tokens) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        logger.info('Refreshed Tokens', tokens);
        await insertToken(tokens);
        resolve(oauth2Client);
      }
    });
  })
);

export const sendMessage = async () => {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const { access_token, refresh_token, expiry_date } = await getToken();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'ili@thoughtworks.com',
      clientId,
      clientSecret,
      refreshToken: refresh_token,
      accessToken: access_token,
      expires: expiry_date,
    },
  });
  transporter.sendMail({
    from: 'ili@thoughtworks.com',
    to: 'dnflyangle@gmail.com',
    subject: 'Message',
    text: 'I hope this message gets through!',
  });
};
