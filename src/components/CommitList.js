// @flow
import React, { Component } from 'react'
import { findIndex } from 'lodash'
import classNames from 'classnames'

import Log from 'components/Log'
import { UP, DOWN } from 'constants/keycodes'

import './CommitList.scss'

type Props = {
  className?: string,
  selected?: string,
  logs: Array<CommitLog>,
  onClickCommit: (sha: string) => void,
}

type State = {
  currentIndex: number,
}

class CommitList extends Component<Props, State> {
  dom: ?HTMLElement

  state = {
    currentIndex: 0,
  }

  componentDidMount() {
    if (this.dom) this.dom.focus()
    this.setCurrentIndex()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selected === this.props.selected) return
    this.setCurrentIndex()
  }

  setCurrentIndex = () => {
    const { logs, selected } = this.props

    this.setState({
      currentIndex: findIndex(logs, x => x.sha === selected),
    })
  }

  handleClickLog = (sha: string) => () => {
    this.props.onClickCommit(sha)
  }

  handleKeyDown = (evt: KeyboardEvent) => {
    if (![UP, DOWN].includes(evt.keyCode)) return
    evt.preventDefault()
    evt.stopPropagation()

    const { currentIndex } = this.state
    console.log({ currentIndex })
    const { logs } = this.props

    const index = evt.keyCode === UP
      ? Math.max(0, currentIndex - 1)
      : Math.min(logs.length - 1, currentIndex + 1)

    this.props.onClickCommit(logs[index].sha)
    this.scroll()
  }

  scroll = () => {
    if (!this.dom) return
    const highlighted = ((this.dom.querySelector('.Log.highlighted'): any): HTMLElement)
    const { top } = highlighted.getBoundingClientRect()

    const { clientHeight } = this.dom || {}
    if (top > clientHeight * 0.8) {
      // $FlowFixMe
      this.dom.scrollTop += Math.floor(clientHeight * 0.25)
    } else if (top < clientHeight * 0.2) {
      // $FlowFixMe
      this.dom.scrollTop -= Math.floor(clientHeight * 0.25)
      return
    }
  }

  handleFocus = () => {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  handleBlur = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { className, selected, logs } = this.props

    return (
      <div
        ref={(ref) => { this.dom = ref }}
        tabIndex={'-1'}
        className={classNames('CommitList', className)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {logs.map((log: CommitLog) => (
          <Log
            key={log.sha}
            onClick={this.handleClickLog(log.sha)}
            isSelected={selected === log.sha}
            {...log}
          />
        ))}
      </div>
    )
  }
}

export default CommitList
