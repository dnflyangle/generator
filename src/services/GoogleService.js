import Promise from 'promise';
import { OAuth2Client } from 'google-auth-library';

const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send',
];

export const getOauth2Client = async () => {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const redirectUrl = process.env.REDIRECT_URI;

  return new OAuth2Client(clientId, clientSecret, redirectUrl);
};

export const authorize = async () => (
  new Promise(async (resolve) => {
    const oauth2Client = await getOauth2Client();
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      include_granted_scopes: true,
      scope: scopes,
    });

    resolve(authUrl);
  })
);
