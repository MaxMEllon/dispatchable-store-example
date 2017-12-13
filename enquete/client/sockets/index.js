import _ from 'lodash'
import * as actions from '../actions'
import store from '../stores'

export default function sokcetInitalize(socket) {
  socket.on('answers/start', (payload) => {
    store.dispatch(actions.updateCurrentQuestions(payload.subject, payload.questions))
    _.defer(() => store.dispatch(actions.startAnswer()))
  })

  socket.on('answers/end', (payload) => {
    store.dispatch(actions.updateResult(payload.results))
  })
}
