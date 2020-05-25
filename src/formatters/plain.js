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
    const { name, status } = node;
    const value = getValue(node.value);
    const oldValue = getValue(node.oldValue);
    const children = node.children || null;

    if (children) {
      return children.filter((child) => child.status !== 'unchanged')
        .map((child) => iter(child, `${acc}${name}.`)).join('\n');
    }

    switch (status) {
      case 'deleted':
        return `Property "${acc}${name}" was deleted`;
      case 'added':
        return `Property "${acc}${name}" was added with value: ${value}`;
      case 'changed':
        return `Property "${acc}${name}" was changed from ${oldValue} to ${value}`;
      default:
        throw new Error(`Unknown status: '${status}'!`);
    }
  };

  return ast.filter((node) => node.status !== 'unchanged')
    .map((node) => iter(node, '')).join('\n');
};
