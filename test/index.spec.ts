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
