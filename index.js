const omit = require('ramda.dissocpath');

const omitFields = ({ object, fieldsToOmit }) => {
  if (isArrayOrObject(fieldsToOmit) !== 'array') {
    throw new Error('fieldsToOmit needs to be an array or a string');
  }

  return fieldsToOmit.reduce((prev, field) => {
    return removeField(prev, field);
  }, object);
};

const removeField = (object, field) => {
  return omit(field.split('.'), object);
};
const isArrayOrObject = collection => {
  return Array.isArray(collection) ? 'array' : typeof collection;
};
const main = (collection = [], fieldsToOmit = []) => {
  const collectionType = isArrayOrObject(collection);
  switch (collectionType) {
    case 'array':
      return collection.map(object => omitFields({ object, fieldsToOmit }));
    case 'object':
      return omitFields({ object: collection, fieldsToOmit });
    default:
      throw new Error('Invalid collection provided: expected are [] or [{}]');
  }
};

module.exports = main;
