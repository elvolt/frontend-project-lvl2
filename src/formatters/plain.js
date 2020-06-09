import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  // Fix converting numbers in ini-parser
  if (String(Number(value)) === value) {
    return JSON.stringify(Number(value));
  }

  return JSON.stringify(value);
};

export default (ast) => {
  const iter = (node, acc) => {
    const { name, type, children } = node;
    const value = getValue(node.value);
    const oldValue = getValue(node.oldValue);

    switch (type) {
      case 'unchanged':
        break;
      case 'deleted':
        return `Property "${acc}${name}" was deleted\n`;
      case 'added':
        return `Property "${acc}${name}" was added with value: ${value}\n`;
      case 'changed':
        return `Property "${acc}${name}" was changed from ${oldValue} to ${value}\n`;
      case 'nested':
        return children.map((child) => iter(child, `${acc}${name}.`)).join('');
      default:
        throw new Error(`Unknown type: '${type}'!`);
    }

    return '';
  };

  return ast.map((node) => iter(node, '')).join('').trim();
};
