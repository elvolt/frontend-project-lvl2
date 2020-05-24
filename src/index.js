import parse from './parsers.js';
import genDiff from './gendiff.js';
import stylish from './stylish.js';

export default (filePath1, filePath2) => {
  const file1Parsed = parse(filePath1);
  const file2Parsed = parse(filePath2);

  const differences = genDiff(file1Parsed, file2Parsed);

  return stylish(differences);
};
