import { access } from 'node:fs/promises';

/**
 * Checks if the given file path exists and is accessible.
 *
 * @param path The file path to check.
 * @returns Whether the given path is accessible.
 */
export async function exists(path?: string | null) {
  if (path === undefined || path === null) {
    return false;
  }

  try {
    await access(path);
  } catch {
    return false;
  }

  return true;
}
