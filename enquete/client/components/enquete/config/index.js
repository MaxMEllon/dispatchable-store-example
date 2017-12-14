import _ from 'lodash'
import React, { Component } from 'react'
import * as actions from '../../../actions'
import store from '../../../stores'

export default class Config extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: store.getState().questions,
      subject: store.getState().subject,
    }
    this.onInput = this.onInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
  }

  componentWillUnmount() {
    const { subject, questions } = this.state
    store.dispatch(actions.updateCurrentQuestions({ subject, questions }))
  }

  onInput(e) {
    const subject = e.target.value
    this.setState({ subject })
  }

  onChange(e, id) {
    const { questions } = this.state
    questions[id] = e.target.value
    this.setState(questions)
  }

  onStart() {
    const { questions, subject } = this.state
    const { socket } = store.getState()
    store.dispatch(actions.emitQuestions({ subject, questions }))
  }

  onStop() {
    const { socket } = store.getState()
    store.dispatch(actions.stopAnswer())
  }

  render() {
    return (
      <div>
        <h1 className="title">アンケート設定画面</h1>
        <h2 className="subtitle">アンケートの質問項目を入力してください</h2>
        <div className="field">
          <label className="label">質問文</label>
          <input
            type="text"
            className="input"
            onChange={this.onInput}
            value={this.state.subject}
          />
        </div>
        {
          _.times(3, (i) => (
            <div key={i}>
              {
                _.times(3, (j) => (
                  <div
                    key={`${i}-${j}`}
                    className="field"
                    style={{ width: '33%', display: 'inline-block' }}
                  >
                    <label className="label">{`質問${i * 3 + j + 1}`}</label>
                    <input
                      className="input"
                      type="text"
                      value={this.state.questions[i * 3 + j]}
                      onChange={e => this.onChange(e, i * 3 + j)}
                    />
                  </div>
                ))
              }
            </div>
          ))
        }
        <button className="button is-success" onClick={this.onStart}>
          開始
        </button>
        <button className="button is-danger" onClick={this.onStop}>
          終了
        </button>
      </div>
    )
  }
}
