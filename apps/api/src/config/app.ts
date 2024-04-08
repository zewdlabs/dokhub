import { getEnv } from '@/env';

export type AppConfig = {
  env: {
    type: 'production' | 'development';
  };
  api: {
    port: number;
    path: string;
    url: string;
  };
  db: {
    dburl: string;
    redisUrl: string;
  };
};

const loadConfig = (): AppConfig => {
  return {
    env: {
      type: getEnv('NODE_ENV', 'development'),
    },
    api: {
      port: Number(getEnv('API_PORT', '5555')),
      path: getEnv('API_URL', 'http://localhost'),
      url: `${getEnv('API_URL', 'http://localhost')}${
        process.env.API_PORT &&
        getEnv('NODE_ENV', 'development') === 'development'
          ? `:${Number(getEnv('API_PORT', '5555'))}`
          : ''
      }/api/v1`,
    },
    db: {
      dburl: getEnv('DATABASE_URL'),
      redisUrl: getEnv('REDIS_URL'),
    },
  };
};

export default loadConfig;
