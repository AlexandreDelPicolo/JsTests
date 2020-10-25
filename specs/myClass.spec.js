const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const MyClass = require('../src/myClass.js');
const myObjt = new MyClass();

describe('Test suit', () => {
  it('Test the add method', () => {
    expect(myObjt.add(1, 2)).to.be.equal(3);
  });

  it('Spy the add method', () => {
    const spy = sinon.spy(myObjt, 'add');
    const arg1 = 10, arg2 = 20;
    myObjt.callAnotherFunction(arg1, arg2);
    //sinon.assert.calledOnce(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(arg1, arg2)).to.be.true;
  });

  it('Spy the callback method', () => {
    const callback = sinon.spy();
    myObjt.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true;
  });

  it('Mock the sayHello method', () => {
    const mock = sinon.mock(myObjt);
    const expectation = mock.expects('sayHello');
    expectation.exactly(1);
    expectation.withArgs('hello world');
    myObjt.callAnotherFunction(10, 20);
    mock.verify();
  });
});