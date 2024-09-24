export const objectToKeyValueArray = (obj) => {
  const keyValueArray = [];

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      // Convert array objects into a readable string format
      keyValueArray.push([key, JSON.stringify(obj[key])]);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // For nested objects, stringify them
      keyValueArray.push([key, JSON.stringify(obj[key])]);
    } else {
      // For primitive values, add key and value
      keyValueArray.push([key, obj[key]]);
    }
  }

  return keyValueArray;
};
