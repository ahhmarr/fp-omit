const { expect } = require('chai');
const { mockArrayCollection, collection } = require('./mock');

const fpOmit = require('../src/index');

describe('testing array of collection', () => {
  it('should skip unavailable fields', () => {
    const fieldsToRemove = ['invalid_props', 'xxx', 's.d.f.d'];

    expect(() => {
      fpOmit(mockArrayCollection, fieldsToRemove);
    }).to.not.throw(Error);
  });
  it('should throw error in case of invalid args', () => {
    const fieldsToRemove = 198;

    expect(() => {
      fpOmit(mockArrayCollection, fieldsToRemove);
    }).to.throw(Error);
  });
  it('should return same length of collection', () => {
    const fieldsToRemove = [];
    const result = fpOmit(mockArrayCollection, fieldsToRemove);

    expect(result.length).to.be.eql(mockArrayCollection.length);
  });

  it('should filter nested fields', () => {
    const fieldsToRemove = ['user.email', 'user.name'];
    const result = fpOmit(mockArrayCollection, fieldsToRemove);

    result.forEach(({ user }) => {
      expect(user).to.not.have.property('email');
      expect(user).to.not.have.property('name');
    });
  });
  it('should filter non-nested fields', () => {
    const fieldsToRemove = ['user', 'user_id', 'last_login'];
    const result = fpOmit(mockArrayCollection, fieldsToRemove);

    result.forEach((object) => {
      expect(object).to.not.have.property('user');
      expect(object).to.not.have.property('user_id');
      expect(object).to.not.have.property('last_login');
    });
  });
  it('should filter both nested and non-nested fields', () => {
    const fieldsToRemove = ['user.email', 'user_id', 'active_flag'];
    const result = fpOmit(mockArrayCollection, fieldsToRemove);

    result.forEach((object) => {
      expect(object.user).to.not.have.property('email');
      expect(object).to.not.have.property('user_id');
      expect(object).to.not.have.property('active_flag');
    });
  });
});
describe('testing collection', () => {
  it('should skip unavailable fields', () => {
    const fieldsToRemove = ['invalid_props', 'xxx', 's.d.f.d'];

    expect(() => {
      fpOmit(collection, fieldsToRemove);
    }).to.not.throw(Error);
  });
  it('should throw error in case of invalid args', () => {
    const fieldsToRemove = 198;

    expect(() => {
      fpOmit(collection, fieldsToRemove);
    }).to.throw(Error);
  });
  it('should return same length of collection', () => {
    const fieldsToRemove = [];
    const result = fpOmit(collection, fieldsToRemove);

    expect(result.length).to.be.eql(collection.length);
  });

  it('should filter nested fields', () => {
    const fieldsToRemove = ['user.email', 'user.name'];
    const { user } = fpOmit(collection, fieldsToRemove);

    expect(user).to.not.have.property('email');
    expect(user).to.not.have.property('name');
  });
  it('should filter non-nested fields', () => {
    const fieldsToRemove = ['user', 'user_id', 'last_login'];
    const result = fpOmit(collection, fieldsToRemove);

    expect(result).to.not.have.property('user');
    expect(result).to.not.have.property('user_id');
    expect(result).to.not.have.property('last_login');
  });
  it('should filter both nested and non-nested fields', () => {
    const fieldsToRemove = ['user.email', 'user_id', 'active_flag'];
    const result = fpOmit(collection, fieldsToRemove);

    expect(result.user).to.not.have.property('email');
    expect(result).to.not.have.property('user_id');
    expect(result).to.not.have.property('active_flag');
  });
  it('should filter property with dot notation as well', () => {
    const fieldsToRemove = ['some.\\dot.\\prop.sub.\\object'];
    const newCollection = {
      ...collection,
      'some.dot.prop': {
        'sub.object': {
          prop: 'value',
        },
      },
    };
    const result = fpOmit(newCollection, fieldsToRemove);

    expect(result['some.dot.prop']).to.not.have.property('sub.object');
  });
});
