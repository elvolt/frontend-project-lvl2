import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? { type: 'complicated', value } : { type: 'simple', value });
const makeAddedLeafNode = (name, value) => ({ name, type: 'added', value: getValue(value) });
const makeDeletedLeafNode = (name, value) => ({ name, type: 'deleted', value: getValue(value) });
const makeChangedLeafNode = (name, value, oldValue) => (
  {
    name, type: 'changed', value: getValue(value), oldValue: getValue(oldValue),
  }
);
const makeUnchangedLeafNode = (name, value) => ({ name, type: 'unchanged', value: getValue(value) });
const makeWithNestedNode = (name, children = []) => ({ name, type: 'nested', children });

const getDiff = (before, after) => {
  const uniqKeysSorted = _.union(_.keys(before), _.keys(after)).sort();

  const differences = uniqKeysSorted.map((key) => {
    // added
    if (!_.has(before, key)) {
      return makeAddedLeafNode(key, after[key]);
    }
    // deleted
    if (!_.has(after, key)) {
      return makeDeletedLeafNode(key, before[key]);
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return makeWithNestedNode(key, getDiff(before[key], after[key]));
    }
    // changed
    if (before[key] !== after[key]) {
      return makeChangedLeafNode(key, after[key], before[key]);
    }
    // unchanged
    return makeUnchangedLeafNode(key, after[key]);
  });

  return differences;
};

export default getDiff;
