// @flow
import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'screens/Home'

type Props = {}

class Root extends Component<Props> {
  render() {
    return (
      <Home />
    )
  }
}

export default Root
