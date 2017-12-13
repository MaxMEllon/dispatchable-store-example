import _ from 'lodash'
import store, { initialState } from '../stores'
import * as actions from '../actions'
import socketInitialize from '../sockets'

const logger = (actions, prevState, state) => {
  console.log(
    `Action: ${actions.type}\n`,
    '\tpayload\t=>',
    actions.payload,
    '\n',
    '\tprev\t=>',
    prevState,
    '\n',
    '\tcurrent\t=>',
    state
  )
}

export default function initializeReducer() {
  store.register({
    [actions.connectToSocketServer.name]: (prevState, payload) => {
      if (store.getState().socket) return prevState
      const socket = io(payload.url)
      socketInitialize(socket)
      return Object.assign({}, prevState, { socket })
    },
    [actions.initalizeEnquete.name]: (prevState, payload) => {
      return initialState
    },
    [actions.changeCurrentTabs.name]: (prevState, payload) => {
      return Object.assign({}, prevState, { tabs: payload.tabs })
    },
    [actions.updateCurrentQuestions.name]: (prevState, payload) => {
      return Object.assign({}, prevState,
        {
          subject: payload.subject,
          questions: payload.questions,
        }
      )
    },
    [actions.emitQuestions.name]: (prevState, payload) => {
      const { socket } = store.getState()
      socket.emit('questions/update', payload)
      return prevState
    },
    [actions.startAnswer.name]: (prevState) => {
      return Object.assign({}, prevState, { enqueteState: 'started' })
    },
    [actions.stopAnswer.name]: (prevState) => {
      const { socket } = store.getState()
      socket.emit('answers/stop')
      return prevState
    },
    [actions.submitAnswer.name]: (prevState, payload) => {
      const { socket } = store.getState()
      socket.emit('answers/submit', { index: payload.index })
      return Object.assign({}, prevState, { enqueteState: 'submitted' })
    },
    [actions.updateResult.name]: (prevState, payload) => {
      return Object.assign({}, prevState, {
        enqueteState: 'stopped',
        results: payload.results
      })
    },
  })

  store.subscribe(state => Object.assign({}, state))(logger)
}
