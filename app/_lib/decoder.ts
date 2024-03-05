/**
 * Gets a string property from an object.
 *
 * Throws an error if the object is undefined or null,
 * or if the key is not a string or is empty.
 *
 * @param obj The object.
 * @param key The property name.
 * @param source Where the object's data was loaded from.
 * @returns The string value.
 */
export function getString(obj: any, key: string, source: string): string {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    throw new Error(`Cannot decode string from '${obj}'`);
  } else if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`The key '${key}' is missing in ${source}`);
  } else if (typeof obj[key] !== 'string' || obj[key].length === 0) {
    throw new Error(`The key '${key}' must be a string in ${source}`);
  }

  return obj[key];
}

/**
 * Gets a string[] property from an object.
 *
 * Throws an error if the object is undefined or null,
 * or if the property is not an array of non-empty strings.
 *
 * @param obj The object.
 * @param key The property name.
 * @param source Where the object's data was loaded from.
 * @returns The array of values.
 */
export function getStringArray(
  obj: any,
  key: string,
  source: string,
): string[] {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    throw new Error(`Cannot decode string array from '${obj}'`);
  } else if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`The key '${key}' is missing in ${source}`);
  } else if (!Array.isArray(obj[key]) || obj[key].length === 0) {
    throw new Error(`The key '${key}' must be a list of strings in ${source}`);
  } else if (!obj[key].every((v: any) => v !== null && typeof v === 'string')) {
    throw new Error(
      `The key '${key}' must only contain string values in ${source}`,
    );
  }

  return obj[key];
}

/**
 * Gets a number property from an object.
 *
 * Throws an error if the object is undefined or null,
 * or if the key is not a number.
 *
 * @param obj The object.
 * @param key The property name.
 * @param source Where the object's data was loaded from.
 * @returns The number value.
 */
export function getNumber(obj: any, key: string, source: string): number {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    throw new Error(`Cannot decode number from '${obj}'`);
  } else if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`The key '${key}' is missing in ${source}`);
  } else if (typeof obj[key] !== 'number') {
    throw new Error(`The key '${key}' must be a number in ${source}`);
  }

  return obj[key];
}

/**
 * Gets a number[] property from an object.
 *
 * Throws an error if the object is undefined or null,
 * or if the property is not an array of numbers.
 *
 * @param obj The object.
 * @param key The property name.
 * @param source Where the object's data was loaded from.
 * @returns The array of values.
 */
export function getNumberArray(
  obj: any,
  key: string,
  source: string,
): number[] {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    throw new Error(`Cannot decode numbers array from '${obj}'`);
  } else if (obj[key] === undefined || obj[key] === null) {
    throw new Error(`The key '${key}' is missing in ${source}`);
  } else if (!Array.isArray(obj[key]) || obj[key].length === 0) {
    throw new Error(`The key '${key}' must be a list of numbers in ${source}`);
  } else if (!obj[key].every((v: any) => v !== null && typeof v === 'number')) {
    throw new Error(
      `The key '${key}' must only contain number values in ${source}`,
    );
  }

  return obj[key];
}
