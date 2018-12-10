const stackCreator = () => {
  const state = {
    data: {},
    top: 0,
  }

  return {
    push: (value) => {
      state.data[state.top++] = value
      return state.top
    },
    pop: () => {
      if(state.top < 1) return null
      return state.data[--state.top]
    },
    peek: () => {
      if(state.top < 1) return null
      return state.data[state.top - 1]
    },
    isEmpty: () => state.top == 0,
  }
}

module.exports = stackCreator
