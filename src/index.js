import lodash from 'lodash';
import parse from './parsers.js';
import render from './render.js';

const { has } = lodash;

export default (filePath1, filePath2) => {
  const file1Parsed = parse(filePath1);
  const file2Parsed = parse(filePath2);

  const file1Keys = Object.keys(file1Parsed);
  const file2Keys = Object.keys(file2Parsed);
  const filesKeys = [...new Set([...file1Keys, ...file2Keys])];

  const difference = filesKeys.reduce((acc, key) => {
    // added
    if (!has(file1Parsed, key)) {
      acc[key] = ['added', file2Parsed[key]];
      return acc;
    }
    // deleted
    if (!has(file2Parsed, key)) {
      acc[key] = ['deleted', file1Parsed[key]];
      return acc;
    }
    // changed
    if (file2Parsed[key] !== file1Parsed[key]) {
      acc[key] = ['changed', file2Parsed[key], file1Parsed[key]];
      return acc;
    }
    // unchanged
    acc[key] = ['unchanged', file2Parsed[key]];
    return acc;
  }, {});

  return render(difference);
};
