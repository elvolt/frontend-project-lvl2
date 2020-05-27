import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';
import ini from 'ini';

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);

export default (filePath) => {
  const absoluteFilepath = filePath.startsWith('/') ? filePath : getAbsolutePath(filePath);
  const format = path.extname(filePath);
  const data = fs.readFileSync(absoluteFilepath, 'utf8');

  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad(data);
  }

  if (format === '.ini') {
    return ini.parse(data);
  }

  if (format === '.json') {
    return JSON.parse(data);
  }

  throw new Error(`Error: format ${format} is not supported`);
};
