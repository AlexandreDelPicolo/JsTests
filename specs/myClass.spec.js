
const MyClass = require('../src/myClass.js');
const myObjt = new MyClass();
const chai = require('chai');
const expect = chai.expect;


describe('Test suit', () => {
  it('Test the add method', () => {
    expect(myObjt.add(1, 2)).to.be.equal(3);
  });
});