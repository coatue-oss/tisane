"use strict";
const index_1 = require("../lib/index");
function returnSomething() {
    return 'ola';
}
index_1.testFn(returnSomething, given => {
    given().expect('ola');
});
function add(a, b) {
    return a + b;
}
index_1.testFn(add, given => {
    given(1, 2).expect(3);
    given(3, 4).expect(7);
});
