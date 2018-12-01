// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import './FileList.scss'

type Props = {
  className?: string,
}

class FileList extends Component<Props> {
  render() {
    const { className } = this.props

    return (
      <div className={classNames('FileList', className)}>
      </div>
    )
  }
}

export default FileList