import _ from 'lodash'
import React, { Component } from 'react'
import store from '../../../stores'
import * as actions from '../../../actions'

const onClick = (key) => {
  const { tabs } = store.getState()
  const next = {}
  _.forEach(tabs, (isActive, k) => {
    if (key === k) {
      next[k] = true
    } else {
      next[k] = false
    }
  })
  store.dispatch(actions.changeCurrentTabs(next))
}

export default class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: store.getState().tabs
    }
    this.handleUpdateStore = this.handleUpdateStore.bind(this)
  }

  componentDidMount() {
    this.subscriberId = store.subscribe(state => state.tabs)(this.handleUpdateStore)
  }

  componentWillUnmount() {
    store.unsbscribe(this.subscriberId)
  }

  handleUpdateStore(_1, _2, tabs) {
    this.setState({ tabs })
  }

  render() {
    const { tabs } = store.getState()
    return (
      <div className="tabs is-boxed">
        <ul>
          {
            _.map(tabs, (isActive, key) => (
              <li
                key={key}
                className={isActive ? 'is-active' : ''}
                onClick={() => onClick(key)}
              ><a>{key}</a></li>
            ))
          }
        </ul>
      </div>
    )
  }
}
