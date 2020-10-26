var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

  xhrFn() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("post", "https://echo-service-new.herokuapp.com/echo", true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    })
      .then(function (result) {
        return result;
      })
      .catch(error => {
        return error;
      });
  }
}

module.exports = MyClass;
