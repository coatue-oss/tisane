(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tisane"] = factory();
	else
		root["tisane"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isRegexp = __webpack_require__(3);
const isObj = __webpack_require__(2);
const getOwnEnumPropSymbols = __webpack_require__(1);

module.exports = (val, opts, pad) => {
	const seen = [];

	return (function stringify(val, opts, pad) {
		opts = opts || {};
		opts.indent = opts.indent || '\t';
		pad = pad || '';

		let tokens;

		if (opts.inlineCharacterLimit === undefined) {
			tokens = {
				newLine: '\n',
				newLineOrSpace: '\n',
				pad,
				indent: pad + opts.indent
			};
		} else {
			tokens = {
				newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
				newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
				pad: '@@__STRINGIFY_OBJECT_PAD__@@',
				indent: '@@__STRINGIFY_OBJECT_INDENT__@@'
			};
		}

		const expandWhiteSpace = string => {
			if (opts.inlineCharacterLimit === undefined) {
				return string;
			}

			const oneLined = string
				.replace(new RegExp(tokens.newLine, 'g'), '')
				.replace(new RegExp(tokens.newLineOrSpace, 'g'), ' ')
				.replace(new RegExp(tokens.pad + '|' + tokens.indent, 'g'), '');

			if (oneLined.length <= opts.inlineCharacterLimit) {
				return oneLined;
			}

			return string
				.replace(new RegExp(tokens.newLine + '|' + tokens.newLineOrSpace, 'g'), '\n')
				.replace(new RegExp(tokens.pad, 'g'), pad)
				.replace(new RegExp(tokens.indent, 'g'), pad + opts.indent);
		};

		if (seen.indexOf(val) !== -1) {
			return '"[Circular]"';
		}

		if (val === null ||
			val === undefined ||
			typeof val === 'number' ||
			typeof val === 'boolean' ||
			typeof val === 'function' ||
			typeof val === 'symbol' ||
			isRegexp(val)) {
			return String(val);
		}

		if (val instanceof Date) {
			return `new Date('${val.toISOString()}')`;
		}

		if (Array.isArray(val)) {
			if (val.length === 0) {
				return '[]';
			}

			seen.push(val);

			const ret = '[' + tokens.newLine + val.map((el, i) => {
				const eol = val.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
				return tokens.indent + stringify(el, opts, pad + opts.indent) + eol;
			}).join('') + tokens.pad + ']';

			seen.pop(val);

			return expandWhiteSpace(ret);
		}

		if (isObj(val)) {
			const objKeys = Object.keys(val).concat(getOwnEnumPropSymbols(val));

			if (objKeys.length === 0) {
				return '{}';
			}

			seen.push(val);

			const ret = '{' + tokens.newLine + objKeys.map((el, i) => {
				if (opts.filter && !opts.filter(val, el)) {
					return '';
				}

				const eol = objKeys.length - 1 === i ? tokens.newLine : ',' + tokens.newLineOrSpace;
				const isSymbol = typeof el === 'symbol';
				const isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el);
				const key = isSymbol || isClassic ? el : stringify(el, opts);
				return tokens.indent + String(key) + ': ' + stringify(val[el], opts, pad + opts.indent) + eol;
			}).join('') + tokens.pad + '}';

			seen.pop(val);

			return expandWhiteSpace(ret);
		}

		val = String(val).replace(/[\r\n]/g, x => x === '\n' ? '\\n' : '\\r');

		if (opts.singleQuotes === false) {
			val = val.replace(/"/g, '\\"');
			return `"${val}"`;
		}

		val = val.replace(/'/g, '\\\'');
		return `'${val}'`;
	})(val, opts, pad);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = object => {
  return Object.getOwnPropertySymbols(object)
    .filter(keySymbol => object.propertyIsEnumerable(keySymbol))
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (re) {
	return Object.prototype.toString.call(re) === '[object RegExp]';
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const stringifyObject = __webpack_require__(0);
class TestCase {
    constructor(givenValue, actualValue) {
        this.givenValue = givenValue;
        this.actualValue = actualValue;
    }
    expect(expectedValue) {
        describe(`when given${beautify(this.givenValue)}`, () => {
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


/***/ })
/******/ ]);
});