export const flattenObject = (obj) => {
  const flattened = {};

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      // Check if the array contains objects with 'name' and 'role'
      if (typeof obj[key][0] === "object" && obj[key][0] !== null) {
        obj[key].forEach((item) => {
          if (item.role && item.name) {
            flattened[item.role] = item.name;
          }
        });
      } else if (typeof obj[key][0] === "string") {
        // If the array contains strings, join them with ", "
        flattened[key] = obj[key].join(", ");
      } else {
        // Flatten other primitive arrays (e.g., numbers)
        flattened[key] = obj[key]
          .map((item) => JSON.stringify(item))
          .join(", ");
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      // Handle nested objects
      for (let nestedKey in obj[key]) {
        flattened[`${key}.${nestedKey}`] = obj[key][nestedKey];
      }
    } else {
      // Handle primitive values
      flattened[key] = obj[key];
    }
  }

  return flattened;
};
