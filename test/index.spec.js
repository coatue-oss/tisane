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
function assign(a, b) {
    return Object.assign({}, a, b);
}
index_1.testFn(assign, given => {
    given({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
    }, {
        h: 8,
        i: 9,
        j: 10,
        k: 11,
    }).expect({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
        k: 11,
    });
});
