# tisane

Minimal type-safe testing

I was impressed by the brevity of [sazerac](https://github.com/mikec/sazerac), however I dearly wanted the type safety and autocomplete functionality of TypeScript and Visual Studio Code.

This is the result:

![](example.png)

## Code

```typescript
function add(a: number, b: number): number {
  return a + b
}
testFn(add, given => {
  given(1, 2).expect(3)
  given(3, 4).expect(7)
})
```

After `npm install`, you can run `jest` and see the result.

## Todo

* Test output could be better, right now it's JSON stringified with two-space indents.
