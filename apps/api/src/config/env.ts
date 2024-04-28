import { logLevels } from './logging';

export type Environment = {
  NODE_ENV: 'development' | 'production';
  API_PORT: string;
  API_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  LOG_LEVEL: keyof typeof logLevels;
  REDIS_URL: string;
};

export const getEnv = <K extends keyof Environment>(
  key: K,
  fallback?: Environment[K],
): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (!value) {
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}.`);
  }

  return value;
};
