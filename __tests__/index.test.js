import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixtureAbsolutePath = (fileName) => path.join(path.resolve(), '__fixtures__', fileName);
const getFixtureRelativePath = (fileName) => path.join('__fixtures__', fileName);

const getPaths = (fileName1, fileName2) => [
  getFixtureAbsolutePath(fileName1), getFixtureRelativePath(fileName2),
];

const resultStylish = fs.readFileSync(`${getFixtureAbsolutePath('resultStylish.txt')}`, 'utf-8');
const resultPlain = fs.readFileSync(`${getFixtureAbsolutePath('resultPlain.txt')}`, 'utf-8');

test.each([
  [...getPaths('before.json', 'after.json'), resultStylish],
  [...getPaths('before.yml', 'after.yml'), resultStylish],
  [...getPaths('before.ini', 'after.ini'), resultStylish],
])('test genDiff with stylish output',
  (filePath1, filePath2, expected) => {
    expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
  });

test.each([
  [...getPaths('before.json', 'after.json'), resultPlain],
  [...getPaths('before.yml', 'after.yml'), resultPlain],
  [...getPaths('before.ini', 'after.ini'), resultPlain],
])('test genDiff with plain output',
  (filePath1, filePath2, expected) => {
    expect(genDiff(filePath1, filePath2, 'plain')).toBe(expected);
  });
