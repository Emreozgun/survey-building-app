import { Type } from '@sinclair/typebox';

export const schema = Type.Object({
  NODE_ENV: Type.String(),
  API_VERSION: Type.String(),
  ORIGIN: Type.String(),
  JWT_SECRET: Type.String(),
  PORT: Type.String(),
  HOST: Type.String(),
  CREDENTIALS: Type.String(),
  POSTGRES_HOST: Type.String(),
  JWT_ACCESS_EXPIRATION_MINUTES: Type.String(),
  JWT_REFRESH_EXPIRATION_DAYS: Type.String(),
});
