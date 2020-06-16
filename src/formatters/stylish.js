const TYPED_SIGNS = {
  added: '+',
  deleted: '-',
  nested: ' '.repeat(2),
  unchanged: ' ',
};

export default (ast) => {
  const iter = (tree, depth) => tree.map((node) => {
    const {
      name, type, value, oldValue,
    } = node;
    const indent1 = ' '.repeat(2 + 4 * depth); // to key
    const indent2 = ' '.repeat(indent1.length + 2); // to closed brace
    const indent3 = ' '.repeat(indent1.length + 4); // to key in object
    const sign = TYPED_SIGNS[type];

    const renderValue = (val) => {
      if (val.type === 'complicated') {
        const [[valueKey, valueValue]] = Object.entries(val.value);
        return `{\n${indent3}  ${valueKey}: ${valueValue}\n${indent2}}`;
      }

      return val.value;
    };

    if (type === 'nested') {
      return `${indent1}${sign}${name}: {\n${iter(node.children, depth + 1)}\n${indent2}}`;
    }

    if (type === 'changed') {
      return iter([
        { ...node, value: oldValue, type: 'deleted' },
        { ...node, type: 'added' },
      ], depth);
    }

    return `${indent1}${sign} ${name}: ${renderValue(value)}`;
  })
    .join('\n');

  return `{\n${iter(ast, 0)}\n}`;
};
