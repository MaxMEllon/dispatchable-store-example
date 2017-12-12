const DispatchableStore = require('dispatchable-store')

const store = new DispatchableStore({
  count: 0,
})

const actions = {
  countUp: 'countUp',
  countDown: 'countDown',
}

store.register({
  [actions.countUp]: (prevState) => {
    return { count: prevState.count + 1 }
  },
  [actions.countDown]: (prevState) => {
    return { count: prevState.count - 1 }
  }
})

const updateCounter = (count) => {
  document.getElementById('counter').innerText = count
}

store.subscribe(state => state.count)((_1, _2, count) => {
  updateCounter(count)
})

window.onload = () => {
  const upButton = document.getElementById('up')
  upButton.addEventListener('click', () => {
    store.dispatch({
      type: actions.countUp
    })
  })

  const downButton = document.getElementById('down')
  downButton.addEventListener('click', () => {
    store.dispatch({
      type: actions.countDown
    })
  })
}
