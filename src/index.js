import parse from './parsers.js';
import getDiff from './getdiff.js';
import render from './formatters/index.js';

export default (filePath1, filePath2, format) => {
  const file1Parsed = parse(filePath1);
  const file2Parsed = parse(filePath2);

  const differences = getDiff(file1Parsed, file2Parsed);

  return render(format, differences);
};
