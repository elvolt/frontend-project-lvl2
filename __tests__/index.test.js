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
const resultJSON = JSON.stringify(JSON.parse(fs.readFileSync(`${getFixtureAbsolutePath('resultJSON.json')}`)));
const [filePath1JSON, filePath2JSON] = [...getPaths('before.json', 'after.json')];
const [filePath1YML, filePath2YML] = [...getPaths('before.yml', 'after.yml')];
const [filePath1INI, filePath2INI] = [...getPaths('before.ini', 'after.ini')];

test.each([
  [filePath1JSON, filePath2JSON, resultStylish],
  [filePath1YML, filePath2YML, resultStylish],
  [filePath1INI, filePath2INI, resultStylish],
])('test genDiff with stylish output',
  (filePath1, filePath2, expected) => {
    expect(genDiff(filePath1, filePath2, 'stylish')).toBe(expected);
  });

test.each([
  [filePath1JSON, filePath2JSON, resultPlain],
  [filePath1YML, filePath2YML, resultPlain],
  [filePath1INI, filePath2INI, resultPlain],
])('test genDiff with plain output',
  (filePath1, filePath2, expected) => {
    expect(genDiff(filePath1, filePath2, 'plain')).toBe(expected);
  });

test.each([
  [filePath1JSON, filePath2JSON, resultJSON],
  [filePath1YML, filePath2YML, resultJSON],
  [filePath1INI, filePath2INI, resultJSON],
])('test genDiff with json output',
  (filePath1, filePath2, expected) => {
    expect(genDiff(filePath1, filePath2, 'json')).toBe(expected);
  });

test('test incorrect output format', () => {
  expect(() => {
    genDiff(filePath1JSON, filePath2JSON, 'html');
  }).toThrow('Error: format html is not supported');
});
