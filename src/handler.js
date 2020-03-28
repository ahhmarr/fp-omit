const omit = require('ramda.dissocpath');


const getFieldArrayFromString = (string = '') => {
  if (string.includes('.\\')) {
    return string.split(/\.(?!\\)/).map((str) => str.replace(/\.\\/g, '.'));
  }

  return string.split('.');
};
const removeField = (object, field) => omit(getFieldArrayFromString(field), object);

const isArrayOrObject = (collection) => (Array.isArray(collection) ? 'array' : typeof collection);
const omitFields = ({ object, fieldsToOmit }) => {
  if (isArrayOrObject(fieldsToOmit) !== 'array') {
    throw new Error('fieldsToOmit needs to be an array');
  }

  return fieldsToOmit.reduce((prev, field) => removeField(prev, field), object);
};

module.exports = {
  omitFields,
  removeField,
  getFieldArrayFromString,
  isArrayOrObject,
};
