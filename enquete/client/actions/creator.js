export default function createAction(type) {
  function action(args) {
    return {
      type,
      payload: args,
    }
  }

  Object.defineProperty(action, 'type', {
    value: type,
    writeable: false,
  })

  return action
}
