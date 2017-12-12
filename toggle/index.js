const DispatchableStore = require('dispatchable-store')

const store = new DispatchableStore({
  enable: false,
})

const actions = {
  toggle: 'toggle',
}

store.register({
  [actions.toggle]: (prevState) => {
    return { enable: !prevState.enable }
  }
})

const toggle = (state) => {
  document.getElementById('button').innerText = state ? 'Enable' : 'Disable'
}

store.subscribe(state => state.enable)((_1, _2, enable) => {
  console.log(enable)
  toggle(enable)
})

window.onload = () => {
  const button = document.getElementById('button')
  button.addEventListener('click', () => {
    store.dispatch({
      type: actions.toggle,
    })
  })
}
