import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

// Fix converting numbers in ini-parser
const fixIni = (data) => _.keys(data).reduce((acc, key) => {
  if (_.isObject(data[key])) {
    acc[key] = fixIni(data[key]);
    return acc;
  }
  if (String(Number(data[key])) === data[key]) {
    acc[key] = Number(data[key]);
    return acc;
  }
  acc[key] = data[key];
  return acc;
}, {});

export default (extension) => (data) => {
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.safeLoad(data);
  }

  if (extension === 'ini') {
    return fixIni(ini.parse(data));
  }

  if (extension === 'json') {
    return JSON.parse(data);
  }

  throw new Error(`Error: format ${extension} is not supported`);
};
