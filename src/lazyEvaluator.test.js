// @ts-nocheck
const LazyEvaluator = require('./lazyEvaluator')

describe('lazyEvaluator', () => {
  it('Should store functions for later evaluation', () => {
    const lazyEvaluator = new LazyEvaluator()
    lazyEvaluator
      .addFunction((values) => { console.log(values)}, { test: 1 })
      .addFunction((values2) => { console.log(values2)}, { test: 2 })

    lazyEvaluator.funcStore.forEach((storedFunc) => {
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
    expect(results).toMatchObject(expected)
  })

  it('Should not call function when adding', () => {
    const lazyEvaluator = new LazyEvaluator()
    const testFunc = jest.fn((values) => { console.log(values)})
    lazyEvaluator
      .addFunction(testFunc, { test: 1 })

    expect(testFunc).toHaveBeenCalledTimes(0)
  })
})
