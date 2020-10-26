class MyClass {
  constructor() {
    console.log("Initiate");
  }

  sayHello(str) {
    console.log(str);
  }

  add(arg1, arg2) {
    let result;
    result = arg1 + arg2;
    return result;
  }

  callAnotherFunction(arg1, arg2) {
    this.sayHello('hello world');
    const result = this.add(arg1, arg2);
    return result;
  }

  callTheCallback(callback) {
    callback();
  }

  async testPromise() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(3), 4000);
    });
    return result * 2;
  }
}

module.exports = MyClass;
