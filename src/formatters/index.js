import stylish from './stylish.js';
import plain from './plain.js';

export default (format, data) => {
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'stylish') {
    return stylish(data);
  }

  throw new Error(`Error: format ${format} is incorrect`);
};
