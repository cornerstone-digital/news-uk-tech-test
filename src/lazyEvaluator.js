class LazyEvaluator {
  constructor() {
    this.funcStore = []

    return this
  }

  addFunction(func, ...args) {
    this.funcStore.push({
      func,
      args
    })

    return this
  }

  execute() {
    const executedValues = []
    this.funcStore.forEach((funcValue) => {
      const funcToExecute = funcValue.func
      const funcResult = funcToExecute(...funcValue.args)
      executedValues.push(funcResult)
    })

    return executedValues
  }
}

module.exports = LazyEvaluator



