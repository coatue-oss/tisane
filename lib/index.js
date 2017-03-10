"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifyObject = require("stringify-object");
class TestCase {
    constructor(args, actualValue) {
        this.args = args;
        this.actualValue = actualValue;
    }
    expect(expectedValue) {
        describe(`when given${beautify(this.args)}`, () => {
            it(`it should return${beautify(expectedValue)}`, () => {
                expect(this.actualValue).toEqual(expectedValue);
            });
        });
    }
}
exports.TestCase = TestCase;
function testFn(fn, describeFn) {
    describe(fn.name || '[unnamed function]', () => {
        function given(...args) {
            const actualValue = fn.apply(null, args);
            return new TestCase(args, actualValue);
        }
        describeFn(given);
    });
}
exports.testFn = testFn;
function beautify(a) {
    const result = stringifyObject(a, {
        indent: '  ',
        singleQuotes: true,
        inlineCharacterLimit: 65,
    });
    return occurrences('\n', result) > 0 ? `:\n${result}` : ` ${result}`;
}
function occurrences(needle, haystack) {
    return haystack.split(needle).length - 1;
}
