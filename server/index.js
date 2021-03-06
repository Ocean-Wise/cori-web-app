/* eslint consistent-return:0 */

// Load in our environment variables
require('dotenv').config();

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const resolve = require('path').resolve;
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');

const algoliaInit = require('./utils/algoliaInit');

const app = express();

const theApi = require('./api');

// Configuration for basic authentication
const auth = require('http-auth');
const internalAuth = auth.basic(
  {
    realm: 'all',
  },
  (username, password, callback) => {
    callback(username === 'admin' && password === 'coriresearch'); // Set the username and password here
  }
);

app.use(sslRedirect());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', theApi);

if (process.env.NODE_ENV === 'production') {
  algoliaInit().then(() => {
    // In production we need to pass these values in instead of relying on webpack
    setup(app, {
      outputPath: resolve(process.cwd(), 'build'),
      publicPath: '/',
    });
  });
} else {
  setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
  });
}
// process.env.NODE_ENV !== 'production' &&
// if (process.env.NODE_ENV !== 'development' || process.env.NODE_ENV !== 'staging') {
if (process.env.NODE_ENV === 'staging') {
  app.use(auth.connect(internalAuth));
}

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(
      port,
      (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }

        logger.appStarted(port, prettyHost, url);
      }
    );
  } else {
    logger.appStarted(port, prettyHost);
  }
});
