import React, { Component } from 'react'
import Config from './config'
import Title from './title'
import Main from './main'
import * as actions from '../../actions'
import store from '../../stores'

const url = () => 'ws://localhost:3000'

export default class Enquete extends Component {
  constructor(props) {
    super(props)
    this.subscriber = []
    this.state = {
      tabs: store.getState().tabs,
      socket: null,
    }
    this.handleUpdateTabs = this.handleUpdateTabs.bind(this)
    this.handleConnect = this.handleConnect.bind(this)
  }

  componentDidMount() {
    store.dispatch(actions.connectToSocketServer(url()))
    this.subscriber.push(store.subscribe(state => state.tabs)(this.handleUpdateTabs))
    this.subscriber.push(store.subscribe(state => state.socket)(this.handleConnect))
  }

  componentWillUnmount() {
    this.subscriber.forEach(subscriberId => store.unsubscribe(subscriberId))
  }

  handleUpdateTabs(_1, _2, tabs) {
    this.setState({ tabs: tabs })
  }

  handleConnect(_1, _2, socket) {
    this.setState({ socket })
  }

  renderSubComponent() {
    if (this.state.tabs.Main) {
      return <Main />
    } else if (this.state.tabs.Config) {
      return <Config />
    }
  }

  render() {
    return (
      <div>
        <Title />
        <section className="section">
          {this.renderSubComponent()}
        </section>
      </div>
    )
  }
}
