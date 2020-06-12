import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getDiff from './getdiff.js';
import render from './formatters/index.js';

const parseFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath).slice(1);

  return parse(extension)(data);
};

export default (filePath1, filePath2, format) => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);

  const differences = getDiff(data1, data2);

  return render(format)(differences);
};
