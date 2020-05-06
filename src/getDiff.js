import fs from 'fs';
import path from 'path';
import process from 'process';
import lodash from 'lodash';

const { has } = lodash;

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);

const render = (obj) => {
  const keys = Object.keys(obj);
  const a = keys.reduce((acc, key) => {
    const [feature, ...value] = obj[key];
    switch (feature) {
      case 'added':
        acc.push(`+ ${key}: ${value}`);
        break;
      case 'deleted':
        acc.push(`- ${key}: ${value}`);
        break;
      case 'unchanged':
        acc.push(`  ${key}: ${value}`);
        break;
      case 'changed':
        acc.push(`+ ${key}: ${value[0]}`);
        acc.push(`- ${key}: ${value[1]}`);
        break;
      default:
        throw new Error(`Unknown feature: '${feature}'`);
    }

    return acc;
  }, []);

  return `{\n  ${a.join('\n  ')};\n}`;
};

export default (filepath1, filepath2) => {
  const absoluteFilepath1 = filepath1.startsWith('/') ? filepath1 : getAbsolutePath(filepath1);
  const absoluteFilepath2 = filepath2.startsWith('/') ? filepath2 : getAbsolutePath(filepath2);

  const file1Content = fs.readFileSync(absoluteFilepath1, 'utf8');
  const file2Content = fs.readFileSync(absoluteFilepath2, 'utf8');

  const file1JSON = JSON.parse(file1Content);
  const file2JSON = JSON.parse(file2Content);

  const file1Keys = Object.keys(file1JSON);
  const file2Keys = Object.keys(file2JSON);
  const filesKeys = [...new Set([...file1Keys, ...file2Keys])];

  const difference = filesKeys.reduce((acc, key) => {
    // added
    if (!has(file1JSON, key)) {
      acc[key] = ['added', file2JSON[key]];
      return acc;
    }
    // deleted
    if (!has(file2JSON, key)) {
      acc[key] = ['deleted', file1JSON[key]];
      return acc;
    }
    // changed
    if (file2JSON[key] !== file1JSON[key]) {
      acc[key] = ['changed', file2JSON[key], file1JSON[key]];
      return acc;
    }
    // unchanged
    acc[key] = ['unchanged', file2JSON[key]];
    return acc;
  }, {});

  return render(difference);
};
