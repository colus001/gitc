// @flow
import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

import Patch from 'components/Patch'

import { getDiff, parseDiff } from 'git/diff'

import './DiffView.scss'

type Props = {
  className?: string,
  selected: ?string,
}

type State = {
  diffs: Array<any>,
}

class DiffView extends Component<Props, State> {
  state = {
    diffs: []
  }

  componentDidMount() {
    this.getDiff()
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selected === this.props.selected) return
    this.getDiff()
  }

  getDiff = async () => {
    if (!this.props.selected) return
    const rawDiffs = await getDiff(this.props.selected)
    const patches = await rawDiffs[0].patches()
    const diffs = await parseDiff(patches)

    this.setState({ diffs })
  }

  render() {
    const { className, selected } = this.props
    const { diffs } = this.state

    return (!!selected && diffs.length > 0) && (
      <div className={classNames('DiffView', className)}>
        {diffs.map((diff: Diff, index) => (
          <Patch key={`${diff.oldFile}-${diff.newFile}`} {...diff} />
        ))}
      </div>
    )
  }
}

export default DiffView
