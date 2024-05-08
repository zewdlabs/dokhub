import type { LoggerOptions } from 'winston';
import { format, transports } from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

const formattedTimestamp = format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const colorizer = format.colorize({
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'white',
    trace: 'grey',
  },
});

const WINSTON_DEV_FORMAT = format.combine(
  format.errors({ stack: true }),
  colorizer,
  formattedTimestamp,
  format.simple(),
);
const WINSTON_PROD_FORMAT = format.combine(
  format.errors({ stack: true }),
  formattedTimestamp,
  format.json(),
);

export const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
} as const;

export const loggerConfig = (): LoggerOptions => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    levels: logLevels,
    level: process.env.LOG_LEVEL ?? 'warn',
    format: isProduction ? WINSTON_PROD_FORMAT : WINSTON_DEV_FORMAT,
    transports: [
      new transports.Console(),
      // new SeqTransport({
      //   serverUrl: isProduction ? process.env.SEQ_URL : '',
      //   onError: (err) => {
      //     console.error('error sending log to seq', err);
      //   },
      // }),
    ],
  };
};
