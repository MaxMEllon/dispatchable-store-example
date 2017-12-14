import _ from 'lodash'
import * as actions from '../actions'
import store from '../stores'

export default function sokcetInitalize(socket) {
  socket.on('answers/start', (payload) => {
    const { subject, questions } = payload
    store.dispatch(actions.updateCurrentQuestions({ subject, questions }))
    _.defer(() => store.dispatch(actions.startAnswer()))
  })

  socket.on('answers/end', (payload) => {
    const { results } = payload
    store.dispatch(actions.updateResult({ results }))
  })
}
