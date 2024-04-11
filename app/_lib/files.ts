import { promises as fs } from 'fs';

/**
 * Checks if the given file path exists and is accessible.
 *
 * @param path The file path to check.
 * @returns Whether the given path is accessible.
 */
export async function exists(path: string) {
  if (path === undefined || path === null) {
    return false;
  }

  try {
    await fs.access(path);
  } catch (e) {
    return false;
  }

  return true;
}
