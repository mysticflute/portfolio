import { describe, it, expect } from '@jest/globals';
import {
  getString,
  getStringArray,
  getNumber,
  getNumberArray,
} from '../decoder';

describe('decoder', () => {
  describe('getString', () => {
    it('should get the string property from an object', () => {
      const obj = { key: 'value' };
      const result = getString(obj, 'key', 'foo.yaml');
      expect(result).toBe('value');
    });

    it('should throw an error if the object is null or undefined', () => {
      expect(() => getString(null, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode string from 'null'",
      );
      expect(() => getString(undefined, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode string from 'undefined'",
      );
    });

    it('should throw an error if the key is missing', () => {
      const obj = { otherKey: 'value' };
      expect(() => getString(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' is missing in foo.yaml",
      );
    });

    it('should throw an error if the value is not a string', () => {
      const obj = { key: 123 };
      expect(() => getString(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a string in foo.yaml",
      );
    });

    it('should throw an error if the string is empty', () => {
      const obj = { key: '' };
      expect(() => getString(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a string in foo.yaml",
      );
    });
  });

  describe('getStringArray', () => {
    it('should get the string array property from an object', () => {
      const obj = { key: ['value1', 'value2'] };
      const result = getStringArray(obj, 'key', 'foo.yaml');
      expect(result).toEqual(['value1', 'value2']);
    });

    it('should throw an error if the object is null or undefined', () => {
      expect(() => getStringArray(null, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode string array from 'null'",
      );
      expect(() => getStringArray(undefined, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode string array from 'undefined'",
      );
    });

    it('should throw an error if the key is missing', () => {
      const obj = { otherKey: ['value'] };
      expect(() => getStringArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' is missing in foo.yaml",
      );
    });

    it('should throw an error if the value is not an array', () => {
      const obj = { key: 'not an array' };
      expect(() => getStringArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a list of strings in foo.yaml",
      );
    });

    it('should throw an error if the array is empty', () => {
      const obj = { key: [] };
      expect(() => getStringArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a list of strings in foo.yaml",
      );
    });

    it('should throw an error if the array contains non-string values', () => {
      const obj = { key: ['value', 123] };
      expect(() => getStringArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must only contain string values in foo.yaml",
      );
    });
  });

  describe('getNumber', () => {
    it('should get the number property from an object', () => {
      const obj = { key: 123 };
      const result = getNumber(obj, 'key', 'foo.yaml');
      expect(result).toBe(123);
    });

    it('should throw an error if the object is null or undefined', () => {
      expect(() => getNumber(null, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode number from 'null'",
      );
      expect(() => getNumber(undefined, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode number from 'undefined'",
      );
    });

    it('should throw an error if the key is missing', () => {
      const obj = { otherKey: 456 };
      expect(() => getNumber(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' is missing in foo.yaml",
      );
    });

    it('should throw an error if the value is not a number', () => {
      const obj = { key: 'not a number' };
      expect(() => getNumber(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a number in foo.yaml",
      );
    });
  });

  describe('getNumberArray', () => {
    it('should get the number array property from an object', () => {
      const obj = { key: [123, 456] };
      const result = getNumberArray(obj, 'key', 'foo.yaml');
      expect(result).toEqual([123, 456]);
    });

    it('should throw an error if the object is null or undefined', () => {
      expect(() => getNumberArray(null, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode numbers array from 'null'",
      );
      expect(() => getNumberArray(undefined, 'key', 'foo.yaml')).toThrowError(
        "Cannot decode numbers array from 'undefined'",
      );
    });

    it('should throw an error if the key is missing', () => {
      const obj = { otherKey: [123] };
      expect(() => getNumberArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' is missing in foo.yaml",
      );
    });

    it('should throw an error if the value is not an array', () => {
      const obj = { key: 'not an array' };
      expect(() => getNumberArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a list of numbers in foo.yaml",
      );
    });

    it('should throw an error if the array is empty', () => {
      const obj = { key: [] };
      expect(() => getNumberArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must be a list of numbers in foo.yaml",
      );
    });

    it('should throw an error if the array contains non-number values', () => {
      const obj = { key: [123, 'not a number'] };
      expect(() => getNumberArray(obj, 'key', 'foo.yaml')).toThrowError(
        "The key 'key' must only contain number values in foo.yaml",
      );
    });
  });
});
