import { testFn } from '../lib/index'

function returnSomething(): string {
  return 'ola'
}
testFn(returnSomething, given => {
  given().expect('ola')
})

function add(a: number, b: number): number {
  return a + b
}
testFn(add, given => {
  given(1, 2).expect(3)
  given(3, 4).expect(7)
})

// subtract (unnamed function)
testFn((a: number, b: number) => a - b, given => {
  given(3, 2).expect(1)
  given(7, 5).expect(2)
})

function assign(a: Object, b: Object): Object {
  return Object.assign({}, a, b)
}
testFn(assign, given => {
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
  })
})
