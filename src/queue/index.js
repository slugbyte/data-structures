module.exports = () => {
  let state = []
  return {
    enqueue: (value) => {
      state.push(value)
      return state.length
    },
    dequeue: () => {
      if(state.length < 1) return null
      return state.shift()
    },
    isEmpty: () => state.length === 0,
  }

}
