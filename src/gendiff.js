import _ from 'lodash';

const genDiff = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  const uniqKeys = [...new Set([...beforeKeys, ...afterKeys])].sort();

  const differences = uniqKeys.reduce((acc, key) => {
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      acc.push({
        name: key,
        children: genDiff(before[key], after[key]),
      });
      return acc;
    }

    // added
    if (!_.has(before, key)) {
      acc.push({
        name: key,
        value: _.cloneDeep(after[key]),
        status: 'added',
      });
      return acc;
    }
    // deleted
    if (!_.has(after, key)) {
      acc.push({
        name: key,
        value: _.cloneDeep(before[key]),
        status: 'deleted',
      });
      return acc;
    }
    // changed
    if (before[key] !== after[key]) {
      acc.push({
        name: key,
        value: _.cloneDeep(after[key]),
        oldValue: _.cloneDeep(before[key]),
        status: 'changed',
      });
      return acc;
    }

    // unchanged
    acc.push({
      name: key,
      value: _.cloneDeep(after[key]),
      status: 'unchanged',
    });
    return acc;
  }, []);

  return differences;
};

export default genDiff;
