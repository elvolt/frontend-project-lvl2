#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, cmdObj) => {
    console.log(genDiff(filepath1, filepath2, cmdObj.format));
  });

program.parse(process.argv);
