import _ from 'lodash';

const STATUS_SIGNS = {
  added: '+',
  deleted: '-',
};

const stylish = (ast) => {
  const iter = (node, depth) => {
    const { name, status, children } = node;
    const value = _.cloneDeep(node.value);
    const oldValue = _.cloneDeep(node.oldValue);
    const indent1 = ' '.repeat(2 + 4 * depth); // до ключа
    const indent2 = ' '.repeat(indent1.length + 2); // до закрыв.фигурн.скобки
    const indent3 = ' '.repeat(indent1.length + 4); // до ключа внутри объекта
    const noStatus = ' '.repeat(2);
    const sign = STATUS_SIGNS[status] || ' ';

    if (children) {
      const updatedChildren = children.map((child) => iter(child, depth + 1));
      return `\n${indent1}${noStatus}${name}: {${updatedChildren.join('')}\n${indent2}}`;
    }

    if (status === 'changed') {
      return [
        { ...node, value: oldValue, status: 'deleted' },
        { ...node, status: 'added' },
      ].map((obj) => iter(obj, depth))
        .join('');
    }

    if (_.isObject(value)) {
      const [[valueKey, valueValue]] = Object.entries(value);
      return `\n${indent1}${sign} ${name}: {\n${indent3}${noStatus}${valueKey}: ${valueValue}\n${indent2}}`;
    }

    return `\n${indent1}${sign} ${name}: ${value}`;
  };

  return `{${ast.map((child) => iter(child, 0)).join('')}\n}`;
};

export default stylish;
