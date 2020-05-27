import _ from 'lodash';

// Fix converting numbers in ini-parser
const getValue = (value) => {
  if (_.isObject(value)) {
    const valueCopy = _.cloneDeep(value);
    const [key] = Object.keys(value);
    valueCopy[key] = getValue(value[key]);

    return valueCopy;
  }

  if (String(Number(value)) === value) {
    return Number(value);
  }

  return value;
};

export default (ast) => {
  const iter = (node) => {
    const output = {};
    const { name, status } = node;
    const value = _.cloneDeep(node.value);
    const oldValue = _.cloneDeep(node.oldValue);
    const children = node.children || null;

    output.status = status;
    output.parametr = name;

    if (children) {
      output.value = children.map((child) => iter(child));
    } else {
      output.value = getValue(value);
    }

    if (status === 'changed') {
      output.oldValue = getValue(oldValue);
    }

    return output;
  };

  const result = ast.map((node) => iter(node));

  return JSON.stringify(result.flat());
};
