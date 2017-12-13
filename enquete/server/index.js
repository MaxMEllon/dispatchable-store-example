const _ = require('lodash')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let state = {
  results: _.times(9, () => 0)
}

io.on('connection', (socket) => {
  socket.on('questions/update', payload => {
    state['questions'] =  payload.questions
    state['subject'] = payload.subject

    io.emit('answers/start', {
      subject: state.subject,
      questions: state.questions,
    })
  })

  socket.on('answers/submit', payload => {
    state.results[payload.index] += 1
  })

  socket.on('answers/stop', () => {
    io.emit('answers/end', { results: state.results })
  })
})

http.listen(3000, () => {
   console.log('accsess to localhost:3000')
})
