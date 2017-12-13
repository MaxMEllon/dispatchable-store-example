import React from 'react'
import Tabs from '../tabs'

export default function Title() {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            synchronized enquete with socket.io
          </h1>
        </div>
      </div>
      <div className="hero-foot">
        <div className="container">
          <Tabs />
        </div>
      </div>
    </section>
  )
}
