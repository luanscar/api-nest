import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  API_NAME: z.string(),
  APP_NAME: z.string(),
  CLIENT_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_EXPIRES_IN: z.coerce.number(),
  BCRYPT_SALT_ROUNDS: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  MAIL_FROM: z.string().email(),
});

export type Env = z.infer<typeof envSchema>;
