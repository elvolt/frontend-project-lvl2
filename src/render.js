export default (obj) => {
  const keys = Object.keys(obj);
  const differences = keys.reduce((acc, key) => {
    const [feature, ...value] = obj[key];
    switch (feature) {
      case 'added':
        acc.push(`+ ${key}: ${value}`);
        break;
      case 'deleted':
        acc.push(`- ${key}: ${value}`);
        break;
      case 'unchanged':
        acc.push(`  ${key}: ${value}`);
        break;
      case 'changed':
        acc.push(`+ ${key}: ${value[0]}`);
        acc.push(`- ${key}: ${value[1]}`);
        break;
      default:
        throw new Error(`Unknown feature: '${feature}'`);
    }

    return acc;
  }, []);

  return `{\n  ${differences.join('\n  ')};\n}`;
};
