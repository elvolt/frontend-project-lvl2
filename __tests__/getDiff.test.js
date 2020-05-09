import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import getDiff from '../src/getDiff.js';

const getFixtureAbsolutePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getFixtureRelativePath = (filename) => path.join('__fixtures__', filename);

const result = fs.readFileSync(`${getFixtureAbsolutePath('result.txt')}`, 'utf-8');

test('test getDiff with JSON', () => {
  const beforeAbsolutePath = getFixtureAbsolutePath('before.json');
  const afterRelativePath = getFixtureRelativePath('after.json');

  expect(getDiff(beforeAbsolutePath, afterRelativePath)).toBe(result);
});

test('test getDiff with YML', () => {
  const beforeAbsolutePath = getFixtureAbsolutePath('before.yml');
  const afterRelativePath = getFixtureRelativePath('after.yml');

  expect(getDiff(beforeAbsolutePath, afterRelativePath)).toBe(result);
});
