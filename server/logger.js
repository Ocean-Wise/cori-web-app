/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  graphQL: (names, lang) => {
    console.log(`${lang} GraphQL Server started! ${chalk.green('✓')}\n`);

    console.log(`${chalk.bold('Contentful content types prepared: ')}${names}\n`);
  },

  pubsDeleted: () => {
    console.log(`Previous publication list deleted ${chalk.green('✓')}\n`);
  },

  pubsAdded: () => {
    console.log(`New publication list inserted ${chalk.green('✓')}\n`);
  },

  peepsDeleted: () => {
    console.log(`Previous person list deleted ${chalk.green('✓')}\n`);
  },

  peepsAdded: () => {
    console.log(`New person list inserted ${chalk.green('✓')}\n`);
  },

  raDeleted: () => {
    console.log(`Previous research area list deleted ${chalk.green('✓')}\n`);
  },

  raAdded: () => {
    console.log(`New research area list inserted ${chalk.green('✓')}\n`);
  },

  progDeleted: () => {
    console.log(`Previous program list deleted ${chalk.green('✓')}\n`);
  },

  progAdded: () => {
    console.log(`New program list inserted ${chalk.green('✓')}\n`);
  },

  intvDeleted: () => {
    console.log(`Previous initiative list deleted ${chalk.green('✓')}\n`);
  },

  intvAdded: () => {
    console.log(`New initiative list inserted ${chalk.green('✓')}\n`);
  },

  projDeleted: () => {
    console.log(`Previous project list deleted ${chalk.green('✓')}\n`);
  },

  projAdded: () => {
    console.log(`New project list inserted ${chalk.green('✓')}\n`);
  },

  indexDeleted: () => {
    console.log(`Old search index deleted ${chalk.green('✓')}\n`);
  },

  divider: () => {
    console.log(divider);
  },

  dataGot: () => {
    console.log(`Updated data pulled from Contentful ${chalk.green('✓')}\n`);
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`Web Server started! ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
(tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
