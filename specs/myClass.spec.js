const sinon = require('sinon');
const chai = require('chai');
const chaiaspromise = require('chai-as-promised');
const expect = chai.expect;
const nock = require('nock');

const MyClass = require('../src/myClass.js');
const myObj = new MyClass();

chai.use(chaiaspromise);

describe('Test suit', () => {
  
  beforeEach(() => sinon.restore());

  it('Test the add method', () => {
    expect(myObj.add(1, 2)).to.be.equal(3);
  });

  it('Spy the add method', () => {
    const spy = sinon.spy(myObj, 'add');
    const arg1 = 10, arg2 = 20;
    myObj.callAnotherFunction(arg1, arg2);
    //sinon.assert.calledOnce(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(arg1, arg2)).to.be.true;
  });

  it('Spy the callback method', () => {
    const callback = sinon.spy();
    myObj.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true;
  });

  it('Mock the sayHello method', () => {
    const mock = sinon.mock(myObj);
    const expectation = mock.expects('sayHello');
    expectation.exactly(1);
    expectation.withArgs('hello world');
    myObj.callAnotherFunction(10, 20);
    mock.verify();
  });
});

describe('Test suit for stub', () => {
  it('Stub the add method', () => {
    const stub = sinon.stub(myObj, 'add');
    stub.withArgs(10, 20)
      .onFirstCall().returns(100)
      .onSecondCall().returns(200);
    expect(myObj.callAnotherFunction(10, 20)).to.be.equal(100);
    expect(myObj.callAnotherFunction(10, 20)).to.be.equal(200);
  });
});

describe("Test the promise", function () {
  it("Promise test case", function (done) {
    this.timeout(5000);
    myObj.testPromise().then(function (result) {
      expect(result).to.be.equal(6);
      done();
    });
  });
});

describe('Test the promise', () => {
  it('Promise test case', function () {
    this.timeout(0);
    return expect(myObj.testPromise()).to.eventually.equal(6);
  });
});

describe('XHR test suit', () => {
  it('Mock and stub xhr call', function (done) {
    var obj = { id: 123 };
    const scope = nock("https://echo-service-new.herokuapp.com")
      .post("/echo")
      .reply(200, obj);
    myObj
      .xhrFn()
      .then(function (result) {
        expect(result).to.be.eql(obj);
        done();
      })
      .catch(error => {
        done(new Error("test case failed: " + error));
      });
  });
});
