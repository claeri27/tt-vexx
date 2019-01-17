/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.magenta('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red.bold(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted) => {
    console.log(`${chalk.yellow('\nServer running!')} ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.gray('Access URLs:')}${divider}
${chalk.cyan('Localhost')}: ${chalk.yellow(`http://${host}:${port}`)}
      ${chalk.cyan('LAN')}: ${chalk.yellow(`http://${ip.address()}:${port}`) +
      (tunnelStarted
        ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
        : '')}${divider}
${chalk.green(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
