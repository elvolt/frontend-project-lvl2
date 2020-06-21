import _ from 'lodash';

const renderValue = (value) => (_.isObject(value) ? '[complex value]' : JSON.stringify(value));

export default (ast) => {
  const iter = (tree, acc) => tree.filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const {
        name, type, value, valueBefore = null, valueAfter = null,
      } = node;

      switch (type) {
        case 'deleted':
          return `Property "${acc}${name}" was deleted`;
        case 'added':
          return `Property "${acc}${name}" was added with value: ${renderValue(value)}`;
        case 'changed':
          return `Property "${acc}${name}" was changed from ${renderValue(valueBefore)} to ${renderValue(valueAfter)}`;
        case 'nested':
          return iter(node.children, `${acc}${name}.`);
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    })
    .join('\n');

  return iter(ast, '');
};
