import pino from 'pino';

/**
 * Server-side logger.
 */
export const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
});
