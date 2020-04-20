const LazyEvaluator = require('./lazyEvaluator')
// @ts-nocheck
// @ts-ignore
describe('lazyEvaluator', () => {
  // @ts-ignore
  it('Should store functions for later evaluation', () => {
    const lazyEvaluator = new LazyEvaluator()
    lazyEvaluator
      .addFunction((values) => { console.log(values)}, { test: 1 })
      .addFunction((values2) => { console.log(values2)}, { test: 2 })

    lazyEvaluator.funcStore.forEach((storedFunc) => {
      // @ts-ignore
      expect(storedFunc.func).toBeInstanceOf(Function)
    })
  })

  // @ts-ignore
  it('Should allow later execution of stored functions', () => {
    const lazyEvaluator = new LazyEvaluator()
    const testFuncs = [
      {
        func: (values) => { return values },
        args: { test: 1 }
      },
      {
        func: (values2) => { return values2 },
        args: { test: 2 }
      }
    ]

    testFuncs.forEach((testFunc) => {
      lazyEvaluator.addFunction(testFunc.func, testFunc.args)
    })
    
    const results = lazyEvaluator.execute()
    const expected = [{ test: 1 }, { test: 2 }]
    // @ts-ignore
    expect(results).toMatchObject(expected)
  })

  // @ts-ignore
  it('Should not call function when adding', () => {
    const lazyEvaluator = new LazyEvaluator()
    // @ts-ignore
    const testFunc = jest.fn((values) => { console.log(values)})
    lazyEvaluator
      .addFunction(testFunc, { test: 1 })

    // @ts-ignore
    expect(testFunc).toHaveBeenCalledTimes(0)
  })
})
