import yaml from 'js-yaml';
import ini from 'ini';

export default (extension) => (data) => {
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.safeLoad(data);
  }

  if (extension === 'ini') {
    return ini.parse(data);
  }

  if (extension === 'json') {
    return JSON.parse(data);
  }

  throw new Error(`Error: format ${extension} is not supported`);
};
