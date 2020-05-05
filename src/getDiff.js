import fs from 'fs';
import path from 'path';
import process from 'process';

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath);

export default (filepath1, filepath2) => {
  const absoluteFilepath1 = filepath1.startsWith('/') ? filepath1 : getAbsolutePath(filepath1);
  const absoluteFilepath2 = filepath2.startsWith('/') ? filepath2 : getAbsolutePath(filepath2);

  const file1Content = fs.readFileSync(absoluteFilepath1, 'utf8');
  const file2Content = fs.readFileSync(absoluteFilepath2, 'utf8');

  const file1JSON = JSON.parse(file1Content);
  const file2JSON = JSON.parse(file2Content);

  
};
