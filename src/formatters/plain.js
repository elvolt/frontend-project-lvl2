const renderValue = (value) => (value.type === 'simple' ? JSON.stringify(value.value) : '[complex value]');

export default (ast) => {
  const iter = (tree, acc) => tree.filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const {
        name, type, value, oldValue,
      } = node;

      switch (type) {
        case 'deleted':
          return `Property "${acc}${name}" was deleted`;
        case 'added':
          return `Property "${acc}${name}" was added with value: ${renderValue(value)}`;
        case 'changed':
          return `Property "${acc}${name}" was changed from ${renderValue(oldValue)} to ${renderValue(value)}`;
        case 'nested':
          return iter(node.children, `${acc}${name}.`);
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    })
    .join('\n');

  return iter(ast, '');
};
