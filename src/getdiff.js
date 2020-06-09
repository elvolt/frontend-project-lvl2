import _ from 'lodash';

const mkAddedLeafNode = (name, value) => ({ name, type: 'added', value });
const mkDeletedLeafNode = (name, value) => ({ name, type: 'deleted', value });
const mkChangedLeafNode = (name, value, oldValue) => (
  {
    name, type: 'changed', value, oldValue,
  }
);
const mkUnchangedLeafNode = (name, value) => ({ name, type: 'unchanged', value });
const mkWithNestedNode = (name, children = []) => ({ name, type: 'nested', children });

const getDiff = (before, after) => {
  const uniqKeysSorted = _.union(_.keys(before), _.keys(after)).sort();

  const differences = uniqKeysSorted.map((key) => {
    // added
    if (!_.has(before, key)) {
      return mkAddedLeafNode(key, after[key]);
    }
    // deleted
    if (!_.has(after, key)) {
      return mkDeletedLeafNode(key, before[key]);
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return mkWithNestedNode(key, getDiff(before[key], after[key]));
    }
    // changed
    if (before[key] !== after[key]) {
      return mkChangedLeafNode(key, after[key], before[key]);
    }
    // unchanged
    return mkUnchangedLeafNode(key, after[key]);
  });

  return differences;
};

export default getDiff;
