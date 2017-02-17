import * as stringifyObject from 'stringify-object'

export class TestCase<Z> {
  constructor(private givenValue: any, private actualValue: Z) { }

  expect(expectedValue: Z): void {
    describe(`when given${beautify(this.givenValue)}`, () => {
      it(`it should return${beautify(expectedValue)}`, () => {
        expect(this.actualValue).toEqual(expectedValue)
      })
    })
  }
}

export function testFn<Z>(fn: () => Z, describeFn: (given: () => TestCase<Z>) => void): void
export function testFn<A, Z>(fn: (a: A) => Z, describeFn: (given: (a: A) => TestCase<Z>) => void): void
export function testFn<A, B, Z>(fn: (a: A, b: B) => Z, describeFn: (given: (a: A, b: B) => TestCase<Z>) => void): void
export function testFn<A, B, C, Z>(fn: (a: A, b: B, c: C) => Z, describeFn: (given: (a: A, b: B, c: C) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, Z>(fn: (a: A, b: B, c: C, d: D) => Z, describeFn: (given: (a: A, b: B, c: C, d: D) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, Z>(fn: (a: A, b: B, c: C, d: D, e: E) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, G, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, G, H, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, G, H, I, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, G, H, I, J, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => TestCase<Z>) => void): void
export function testFn<A, B, C, D, E, F, G, H, I, J, K, Z>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => Z, describeFn: (given: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => TestCase<Z>) => void): void

export function testFn<Z>(fn: Function, describeFn: (given: (...args: any[]) => TestCase<Z>) => void): void {
  describe(fn.name, () => {
    function given(...args: any[]): TestCase<Z> {
      const actualValue = fn.apply(null, args)
      return new TestCase(args, actualValue)
    }
    describeFn(given)
  })
}

function beautify(a: any): string {
  const result = stringifyObject(a, {
    indent: '  ',
    singleQuotes: true,
    inlineCharacterLimit: 65,
  })

  return occurrences('\n', result) > 0 ? `:\n${result}` : ` ${result}`
}

function occurrences(needle: string, haystack: string): number {
  return haystack.split(needle).length - 1
}
