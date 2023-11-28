export function splitJsonData(data, keys) {
  const result = keys.map((group) =>
    group.reduce((obj, key) => {
      if (data?.hasOwnProperty(key)) {
        obj[key] = data[key];
      }
      return obj;
    }, {}),
  );
  return result;
}
