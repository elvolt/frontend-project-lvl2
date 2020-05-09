import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);

export default (filePath) => {
  const absoluteFilepath = filePath.startsWith('/') ? filePath : getAbsolutePath(filePath);
  const format = path.extname(filePath);
  const data = fs.readFileSync(absoluteFilepath, 'utf8');

  if (format === '.yml') {
    return yaml.safeLoad(data);
  }

  return JSON.parse(data);
};
