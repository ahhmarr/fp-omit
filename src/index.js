const { isArrayOrObject, omitFields } = require('./handler');

const main = (collection = [], fieldsToOmit = []) => {
  const collectionType = isArrayOrObject(collection);

  switch (collectionType) {
    case 'array':
      return collection.map((object) => omitFields({ object, fieldsToOmit }));
    case 'object':
      return omitFields({ object: collection, fieldsToOmit });
    default:
      throw new Error('Invalid collection provided: expected are [] or [{}]');
  }
};

module.exports = main;
