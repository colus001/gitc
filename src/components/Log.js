// @flow
import React from 'react'
import classNames from 'classnames'

import { formatDefault } from 'formatters/date'

import './Log.scss'

type Props = {
  className?: string,
  isSelected: boolean,
  onClick?: () => void,
} & CommitLog

const Log = ({
  className, sha, author, date, message, isSelected,
  onClick,
}: Props) => (
  <div
    className={classNames('Log', className, {
      highlighted: !!isSelected,
    })}
    onClick={onClick}
  >
    <div className="Log__message">
      {message}
    </div>
    <div className="Log__author">
      {author}
    </div>
  </div>
)

export default Log
