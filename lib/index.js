"use strict";
class TestCase {
    constructor(givenValue, actualValue) {
        this.givenValue = givenValue;
        this.actualValue = actualValue;
    }
    expect(expectedValue) {
        describe(`when given\n${beautify(this.givenValue)}`, () => {
            it(`it should return\n${beautify(expectedValue)}`, () => {
                expect(this.actualValue).toEqual(expectedValue);
            });
        });
    }
}
exports.TestCase = TestCase;
function testFn(fn, describeFn) {
    describe(fn.name, () => {
        function given(...args) {
            const actualValue = fn.apply(null, args);
            return new TestCase(args, actualValue);
        }
        describeFn(given);
    });
}
exports.testFn = testFn;
function beautify(a) {
    return JSON.stringify(a, null, 2);
}
