import pino from 'pino';

/**
 * Server-side logger.
 *
 * Override the level locally by setting `PINO_LEVEL_LEVEL="level"` in the
 * `.env.local` file.
 */
export const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
});
