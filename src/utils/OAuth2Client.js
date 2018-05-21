const { google } = require('googleapis');

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const redirectUrl = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl,
);

export default oauth2Client;
