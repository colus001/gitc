// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import CommitList from 'containers/CommitList'
import DiffView from 'components/DiffView'

import { getLogFromHead } from 'git/log'
import { setLogs } from 'state/actions/logs'

const path = window.require('path')

import './Home.scss'

type Props = {
  logs: Array<CommitLog>,
  setLogs: (logs: Array<CommitLog>) => void,
}

type State = {
  selected: ?string,
}

class Home extends Component<Props, State> {
  state = {
    selected: null,
  }

  componentDidMount() {
    const { logs } = this.props
    if (logs && logs.length > 0) return
    this.getCommits()
  }

  async getCommits() {
    const logs = await getLogFromHead(path.resolve('../zerocar-app'))
    this.props.setLogs(logs)

    if (!!this.state.selected) return
    this.setState({ selected: logs[0].sha })
  }

  setSelected = (selected: string) => {
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    const { logs } = this.props

    return !!selected && (
      <div className="Home">
        <div className="Home__row">
          <CommitList
            className="Home__commits"
            selected={selected}
            onClickCommit={this.setSelected}
          />
        </div>
        <div className="Home__row">
          <DiffView
            className="Home__diff"
            selected={selected}
          />
          <div className="Home__files">
            FILES
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  logs: state.logs,
})

const mapDispatchToProps = (dispatch) => ({
  setLogs: (logs) => dispatch(setLogs(logs)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
