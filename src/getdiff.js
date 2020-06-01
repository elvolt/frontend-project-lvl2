import _ from 'lodash';

const buildDifferenceLeafNode = (name, value, status, oldValue) => (status === 'changed'
  ? {
    name, value, status, oldValue,
  } : {
    name, value, status,
  }
);

const getDiff = (before, after) => {
  const uniqKeysSorted = _.union(_.keys(before), _.keys(after)).sort();

  const differences = uniqKeysSorted.map((key) => {
    // added
    if (!_.has(before, key)) {
      return buildDifferenceLeafNode(key, _.cloneDeep(after[key]), 'added');
    }
    // deleted
    if (!_.has(after, key)) {
      return buildDifferenceLeafNode(key, _.cloneDeep(before[key]), 'deleted');
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {
        name: key,
        children: getDiff(before[key], after[key]),
      };
    }
    // changed
    if (before[key] !== after[key]) {
      return buildDifferenceLeafNode(key, _.cloneDeep(after[key]), 'changed', _.cloneDeep(before[key]));
    }
    // unchanged
    return buildDifferenceLeafNode(key, _.cloneDeep(after[key]), 'unchanged');
  });

  return differences;
};

export default getDiff;
