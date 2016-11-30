import log from 'winston';
import { config } from './config';

// set log as cli mode
log.cli();

function logServerConfig(err) {
  if (err) log.error(err);

  const url = ['http://', config.host, ':', config.port].join('');

  log.info('==========================================');
  log.info('Environment:', config.env);
  log.info('Listening at:', url);
  log.info('==========================================');
}

export { log, logServerConfig };
