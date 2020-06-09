import _ from 'lodash';

const TYPED_SIGNS = {
  added: '+',
  deleted: '-',
  nested: ' '.repeat(2),
  unchanged: ' ',
};

export default (ast) => {
  const iter = (node, depth) => {
    const {
      name, type, value, oldValue, children,
    } = node;
    const indent1 = ' '.repeat(2 + 4 * depth); // to key
    const indent2 = ' '.repeat(indent1.length + 2); // to closed brace
    const indent3 = ' '.repeat(indent1.length + 4); // to key in object
    const sign = TYPED_SIGNS[type];

    if (type === 'nested') {
      const updatedChildren = children.map((child) => iter(child, depth + 1));
      return `\n${indent1}${sign}${name}: {${updatedChildren.join('')}\n${indent2}}`;
    }

    if (type === 'changed') {
      return [
        { ...node, value: oldValue, type: 'deleted' },
        { ...node, type: 'added' },
      ].map((obj) => iter(obj, depth))
        .join('');
    }

    if (_.isObject(value)) {
      const [[valueKey, valueValue]] = Object.entries(value);
      return `\n${indent1}${sign} ${name}: {\n${indent3}  ${valueKey}: ${valueValue}\n${indent2}}`;
    }

    return `\n${indent1}${sign} ${name}: ${value}`;
  };

  return `{${ast.map((node) => iter(node, 0)).join('')}\n}`;
};
