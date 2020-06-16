import _ from 'lodash';

// Fix converting numbers in ini-parser
const getValue = (value) => {
  if (_.isObject(value)) {
    const valueCopy = _.cloneDeep(value);
    const [key] = Object.keys(value);
    valueCopy[key] = getValue(value[key]);

    return valueCopy;
  }

  return value;
};

export default (ast) => {
  const iter = (node) => {
    const {
      name, type, value, oldValue, children,
    } = node;
    const output = { type, name };

    if (type === 'nested') {
      output.children = children.map((child) => iter(child));
    } else {
      output.value = getValue(value);
    }

    if (type === 'changed') {
      output.oldValue = getValue(oldValue);
    }

    return output;
  };

  const result = ast.map((node) => iter(node));

  return JSON.stringify(result.flat());
};
