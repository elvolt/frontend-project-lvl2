import _ from 'lodash';

const renderValue = (value, indentToBrace) => {
  if (_.isObject(value)) {
    const [[valueKey, valueValue]] = Object.entries(value);
    return `{\n${' '.repeat(indentToBrace.length + 2)}  ${valueKey}: ${valueValue}\n${indentToBrace}}`;
  }

  return value;
};

export default (ast) => {
  const iter = (tree, depth) => tree.map((node) => {
    const {
      name, type, value, valueBefore = null, valueAfter = null,
    } = node;
    const indent1 = ' '.repeat(2 + 4 * depth); // to key
    const indent2 = ' '.repeat(indent1.length + 2); // to closed brace

    switch (type) {
      case 'nested':
        return `${indent1}  ${name}: {\n${iter(node.children, depth + 1)}\n${indent2}}`;
      case 'added':
        return `${indent1}+ ${name}: ${renderValue(value, indent2)}`;
      case 'deleted':
        return `${indent1}- ${name}: ${renderValue(value, indent2)}`;
      case 'changed':
        return `${indent1}- ${name}: ${renderValue(valueBefore, indent2)}\n${indent1}+ ${name}: ${renderValue(valueAfter, indent2)}`;
      case 'unchanged':
        return `${indent1}  ${name}: ${renderValue(value, indent2)}`;
      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  })
    .join('\n');

  return `{\n${iter(ast, 0)}\n}`;
};
