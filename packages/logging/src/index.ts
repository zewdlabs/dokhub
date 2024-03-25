import pino from "pino";
import { createStream } from "pino-seq";

// INFO: check https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications
const logger = pino(
  {
    transport: {
      targets: [
        {
          target: "pino-pretty",
          level: "debug",
          options: {
            destination: 1,
            colorize: true,
          },
        },
      ],
    },
    level: process.env.LOG_LEVEL || "warn",
    redact: {
      // add sensitive fields that should be redacted
      paths: [],
      censor: "[REDACTED]",
      remove: true,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  createStream({
    serverUrl: "http://localhost:5341",
    apiKey: "viaKMm7zDpPlZ6F33Ba1",
    onError: (err) => {
      console.error("Error while sending log to Seq", err);
    },
  }),
);

export default logger;
