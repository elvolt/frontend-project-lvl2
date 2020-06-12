import path from 'path';
import process from 'process';
import fs from 'fs';
import parse from './parsers.js';
import getDiff from './getdiff.js';
import render from './formatters/index.js';

export default (filePath1, filePath2, format) => {
  const file1AbsolutePath = path.resolve(process.cwd(), filePath1);
  const file2AbsolutePath = path.resolve(process.cwd(), filePath2);

  const file1Data = fs.readFileSync(file1AbsolutePath, 'utf8');
  const file2Data = fs.readFileSync(file2AbsolutePath, 'utf8');

  const file1Extension = path.extname(file1AbsolutePath).slice(1);
  const file2Extension = path.extname(file2AbsolutePath).slice(1);

  const file1Parsed = parse(file1Extension)(file1Data);
  const file2Parsed = parse(file2Extension)(file2Data);

  const differences = getDiff(file1Parsed, file2Parsed);

  return render(format)(differences);
};
