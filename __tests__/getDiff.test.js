import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/getDiff.js';

const getFixtureAbsolutePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getFixtureRelativePath = (filename) => path.join('__fixtures__', filename);

const getPaths = (fileName1, fileName2) => [
  getFixtureAbsolutePath(fileName1), getFixtureRelativePath(fileName2),
];

const result = fs.readFileSync(`${getFixtureAbsolutePath('result.txt')}`, 'utf-8');

test('test getDiff with JSON', () => {
  expect(getDiff(...getPaths('before.json', 'after.json'))).toBe(result);
});

test('test getDiff with YML', () => {
  expect(getDiff(...getPaths('before.yml', 'after.yml'))).toBe(result);
});
