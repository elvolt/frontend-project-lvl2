import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import 'lodash.product';
import _ from 'lodash';
import genDiff from '../src/index.js';

const getFixtureAbsolutePath = (fileName) => path.join(path.resolve(), '__fixtures__', fileName);
const getFixtureRelativePath = (fileName) => path.join('__fixtures__', fileName);

const getPaths = (fileName1, fileName2) => [
  getFixtureAbsolutePath(fileName1), getFixtureRelativePath(fileName2),
];

let resultStylish;
let resultPlain;
let resultJSON;
let inputFilesPaths;

beforeAll(() => {
  resultStylish = fs.readFileSync(`${getFixtureAbsolutePath('resultStylish.txt')}`, 'utf-8');
  resultPlain = fs.readFileSync(`${getFixtureAbsolutePath('resultPlain.txt')}`, 'utf-8');
  resultJSON = JSON.stringify(JSON.parse(fs.readFileSync(`${getFixtureAbsolutePath('resultJSON.json')}`)));

  const fileTypes = ['yml', 'ini', 'json'];
  inputFilesPaths = fileTypes.map((type) => getPaths(`before.${type}`, `after.${type}`));
});

test('test genDiff', () => {
  const resultsFormats = [['stylish', resultStylish], ['plain', resultPlain], ['json', resultJSON]];
  const testData = _.product(inputFilesPaths, resultsFormats);

  testData.forEach(([[filePath1, filePath2], [formatter, expected]]) => {
    expect(genDiff(filePath1, filePath2, formatter)).toBe(expected);
  });
});

test('test incorrect output format', () => {
  inputFilesPaths.forEach((paths) => {
    expect(() => {
      genDiff(...paths, 'html');
    }).toThrow('Error: format html is not supported');
  });
});
