import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/getDiff.js';

const getFixtureAbsolutePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getFixtureRelativePath = (filename) => path.join('__fixtures__', filename);

const beforeAbsolutePath = getFixtureAbsolutePath('before.json');
const afterRelativePath = getFixtureRelativePath('after.json');

const result = fs.readFileSync(`${getFixtureAbsolutePath('result.txt')}`, 'utf-8');

test('getDiff', () => {
  expect(getDiff(beforeAbsolutePath, afterRelativePath)).toBe(result);
});
