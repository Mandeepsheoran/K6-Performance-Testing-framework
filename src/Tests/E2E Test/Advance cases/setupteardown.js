export function setup() {
    return { v: 1 };
  }
  
  export default function (data) {
    console.log(JSON.stringify(data));
  }
  
  ///Here's an example of passing some data from the setup code to the VU and teardown stages:
  export function teardown(data) {
    if (data.v != 1) {
      throw new Error('incorrect data: ' + JSON.stringify(data));
    }
  }
  