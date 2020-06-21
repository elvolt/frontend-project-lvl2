import _ from 'lodash';

const getDiff = (before, after) => {
  const uniqKeysSorted = _.union(_.keys(before), _.keys(after)).sort();

  const differences = uniqKeysSorted.map((key) => {
    // added
    if (!_.has(before, key)) {
      return {
        name: key, type: 'added', value: after[key],
      };
    }
    // deleted
    if (!_.has(after, key)) {
      return {
        name: key, type: 'deleted', value: before[key],
      };
    }
    // nested
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {
        name: key, type: 'nested', children: getDiff(before[key], after[key]),
      };
    }
    // changed
    if (before[key] !== after[key]) {
      return {
        name: key, type: 'changed', valueAfter: after[key], valueBefore: before[key],
      };
    }
    // unchanged
    return {
      name: key, type: 'unchanged', value: after[key],
    };
  });

  return differences;
};

export default getDiff;
