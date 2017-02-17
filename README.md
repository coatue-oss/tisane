# tisane

Minimal type-safe testing

I was impressed by the brevity of [sazerac](https://github.com/mikec/sazerac), however I dearly wanted the type safety and autocomplete functionality of TypeScript and Visual Studio Code.

This is the result:

![](https://raw.githubusercontent.com/coatue/tisane/master/example.png)

Not only do you get type safety on the function's parameters, you get it on the return/assertion value as well!

Compatible with Jasmine test runners (jasmine, jest, karma, etc.)

## Example

Before:

```typescript
function add(a: number, b: number): number {
  return a + b
}

describe('add', () => {
  it('should add 1 and 2 to equal 3', () => {
    expect(add(1, 2)).toEqual(3)
  })

  it('should add 3 and 4 to equal 7', () => {
    expect(add(3, 4)).toEqual(7)
  })
})
```

After:

```typescript
import { testFn } from 'tisane'

function add(a: number, b: number): number {
  return a + b
}
testFn(add, given => {
  given(1, 2).expect(3)
  given(3, 4).expect(7)
})
```

Test output (with jest):

```
  add
    when given [1, 2]
      ✓ it should return 3
    when given [3, 4]
      ✓ it should return 7
```

To see it running locally, run `npm install` and then `jest` to see the test results.
