const { expect } = require('chai');
const { mockArrayCollection, collection } = require('./mock');

const {
  isArrayOrObject,
  getFieldArrayFromString,
  removeField,
  omitFields
} = require('../src/handler');

describe('testing methods', () => {
  it('isArrayOrObject() should say either or or specific type', () => {
    expect(isArrayOrObject([1, 2, 3, 4])).to.be.eql('array');
    expect(isArrayOrObject()).to.be.eql('undefined');
    expect(isArrayOrObject(1)).to.be.eql('number');
    expect(isArrayOrObject({})).to.be.eql('object');
  });
  it('getFieldArrayFromString() escape in case of dot notation', () => {
    const dotNotationString = 'some.\\dot.\\prop.sub.\\object';
    expect(getFieldArrayFromString(dotNotationString)).to.deep.equal([
      'some.dot.prop',
      'sub.object'
    ]);
  });
  it('getFieldArrayFromString() parse simple string', () => {
    const simpleString = 'simple';
    const dotNotationString = 'some.string';
    expect(getFieldArrayFromString(simpleString)).to.deep.equal(['simple']);
    expect(getFieldArrayFromString(dotNotationString)).to.deep.equal([
      'some',
      'string'
    ]);
  });
  it('removeField() should remove the field', () => {
    const object = {
      some: {
        object: 'value'
      }
    };
    expect(removeField(object, 'some.object')).to.deep.equal({ some: {} });
  });
  it('omitFields() should omit fields', () => {
    const object = {
      some: {
        object: 'value'
      }
    };
    expect(
      omitFields({ object, fieldsToOmit: ['some.object'] })
    ).to.deep.equal({ some: {} });
  });
  it('omitFields() should throw error', () => {
    expect(() => {
      omitFields({ object: {} });
    }).to.throw(Error);
  });
});
