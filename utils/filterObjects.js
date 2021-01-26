module.exports = (obj, ...allowedFields) => {
  let copy = { ...obj };
  for (let key in obj) {
    if (!allowedFields.includes(key)) {
      delete copy[key];
    }
  }
  return copy;
};
