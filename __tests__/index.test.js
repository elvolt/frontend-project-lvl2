import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixtureAbsolutePath = (fileName) => path.join(path.resolve(), '__fixtures__', fileName);
const getFixtureRelativePath = (fileName) => path.join('__fixtures__', fileName);

const getPaths = (fileName1, fileName2) => [
  getFixtureAbsolutePath(fileName1), getFixtureRelativePath(fileName2),
];

const result = fs.readFileSync(`${getFixtureAbsolutePath('result.txt')}`, 'utf-8');

test.each([
  [...getPaths('before.json', 'after.json'), result],
  [...getPaths('before.yml', 'after.yml'), result],
  [...getPaths('before.ini', 'after.ini'), result],
])('test genDiff', (filePath1, filePath2, expected) => {
  expect(genDiff(filePath1, filePath2)).toBe(expected);
});
