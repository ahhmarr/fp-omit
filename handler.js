const omit = require('ramda.dissocpath');

const omitFields = ({ object, fieldsToOmit }) => {
  if (isArrayOrObject(fieldsToOmit) !== 'array') {
    throw new Error('fieldsToOmit needs to be an array');
  }

  return fieldsToOmit.reduce((prev, field) => {
    return removeField(prev, field);
  }, object);
};

const removeField = (object, field) => {
  return omit(getFieldArrayFromString(field), object);
};
const getFieldArrayFromString = (string = '') => {
  let result;
  if (string.includes('.\\')) {
    return string.split(/\.(?!\\)/).map(string => string.replace(/\.\\/g, '.'));
  }
  return string.split('.');
};
const isArrayOrObject = collection => {
  return Array.isArray(collection) ? 'array' : typeof collection;
};

module.exports = {
  omitFields,
  removeField,
  getFieldArrayFromString,
  isArrayOrObject
};
