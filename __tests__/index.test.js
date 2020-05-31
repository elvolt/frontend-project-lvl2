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

const resultStylish = fs.readFileSync(`${getFixtureAbsolutePath('resultStylish.txt')}`, 'utf-8');
const resultPlain = fs.readFileSync(`${getFixtureAbsolutePath('resultPlain.txt')}`, 'utf-8');
const resultJSON = JSON.stringify(JSON.parse(fs.readFileSync(`${getFixtureAbsolutePath('resultJSON.json')}`)));

const fileTypes = ['yml', 'ini', 'json'];
const resultsFormats = [['stylish', resultStylish], ['plain', resultPlain], ['json', resultJSON]];
const inputFilesPaths = fileTypes.map((type) => getPaths(`before.${type}`, `after.${type}`));

test.each(
  _.product(inputFilesPaths, resultsFormats),
)('test genDiff',
  ([filePath1, filePath2], [formatter, expected]) => {
    expect(genDiff(filePath1, filePath2, formatter)).toBe(expected);
  });

test('test incorrect output format', () => {
  expect(() => {
    genDiff(...getPaths('before.json', 'after.json'), 'html');
  }).toThrow('Error: format html is not supported');
});
