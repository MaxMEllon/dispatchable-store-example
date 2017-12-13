import _ from 'lodash'
import React, { Component } from 'react'
import * as actions from '../../../actions'
import store from '../../../stores'

const questionStyle = {
  display: 'inline-block',
  height: '150px',
  width: '32%',
  fontSize: '30px',
  textAlign: 'center',
  verticalAlign: 'middle',
  backgroundColor: 'rgba(0, 255, 255, 0.18)',
  border: '3px solid gray',
  borderRadius: '30px',
  margin: '4px'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enqueteState: store.getState().enqueteState,
    }
    this.handleStartEnquete = this.handleStartEnquete.bind(this)
    this.onSubmitResult = this.onSubmitResult.bind(this)
  }

  componentDidMount() {
    this.subscriberId = store.subscribe(state => state.enqueteState)(this.handleStartEnquete)
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscriberId)
  }

  handleStartEnquete(_1, _2, enqueteState) {
    this.setState({ enqueteState })
  }

  onSubmitResult(index) {
    store.dispatch(actions.submitAnswer(index))
  }

  renderEnqueteUI() {
    if (this.state.enqueteState === 'initial') {
      return <h2 className="subtitle">アンケートはまだ開始されていません</h2>
    }
    if (this.state.enqueteState === 'submitted') {
      return <h2 className="subtitle">集計中です．．．</h2>
    }
    if (this.state.enqueteState === 'stopped') {
      setTimeout(() => store.dispatch(actions.initalizeEnquete()), 5000)
    }
    const { subject, questions } = store.getState()
    return (
      <div>
        <h2 className="subtitle">{subject}</h2>
        {
          _.compact(questions).map((q, idx) => (
            <div
              key={Math.random()}
              style={questionStyle}
              onClick={() => this.onSubmitResult(idx)}
            >
              <p>{q}</p>
              {
                (() => {
                  if (this.state.enqueteState !== 'stopped') return null;
                  const { results } = store.getState()
                  const sum = _.sum(results)
                  return (
                    <p>
                      {Math.floor(results[idx] / sum * 100)}%
                    </p>
                  )
                })()
              }
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1 className="title">アンケート回答画面</h1>
        {this.renderEnqueteUI()}
      </div>
    )
  }
}
