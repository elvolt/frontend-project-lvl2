import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJSON from './json.js';

export default (format) => (data) => {
  if (format === 'plain') {
    return renderPlain(data);
  }
  if (format === 'stylish') {
    return renderStylish(data);
  }
  if (format === 'json') {
    return renderJSON(data);
  }

  throw new Error(`Error: format ${format} is not supported`);
};
