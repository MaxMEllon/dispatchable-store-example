import _ from 'lodash'
import store, { initialState } from '../stores'
import * as actions from '../actions'
import socketInitialize from '../sockets'

export default function initializeReducer() {
  store.register({
    [actions.connectToSocketServer.type]: (prevState, payload) => {
      if (store.getState().socket) return prevState
      const socket = io(payload.url)
      socketInitialize(socket)
      return Object.assign({}, prevState, { socket })
    },
    [actions.initalizeEnquete.type]: (prevState, payload) => {
      const { socket } = store.getState()
      return Object.assign({}, initialState, { socket })
    },
    [actions.changeCurrentTabs.type]: (prevState, payload) => {
      return Object.assign({}, prevState, { tabs: payload.tabs })
    },
    [actions.updateCurrentQuestions.type]: (prevState, payload) => {
      return Object.assign({}, prevState,
        {
          subject: payload.subject,
          questions: payload.questions,
        }
      )
    },
    [actions.emitQuestions.type]: (prevState, payload) => {
      const { socket } = store.getState()
      socket.emit('questions/update', payload)
      return prevState
    },
    [actions.startAnswer.type]: (prevState) => {
      return Object.assign({}, prevState, { enqueteState: 'started' })
    },
    [actions.stopAnswer.type]: (prevState) => {
      const { socket } = store.getState()
      socket.emit('answers/stop')
      return prevState
    },
    [actions.submitAnswer.type]: (prevState, payload) => {
      const { socket } = store.getState()
      socket.emit('answers/submit', { index: payload.index })
      return Object.assign({}, prevState, { enqueteState: 'submitted' })
    },
    [actions.updateResult.type]: (prevState, payload) => {
      return Object.assign({}, prevState, {
        enqueteState: 'stopped',
        results: payload.results
      })
    },
  })
}
