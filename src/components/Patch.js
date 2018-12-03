// @flow
import React, { Fragment } from 'react'
import classNames from 'classnames'

import Line from 'components/Line'

import './Patch.scss'

type Props = {
  className?: string,
} & Diff

const Patch = ({ className, oldFile, newFile, hunks }: Props) => (
  <div className={classNames('Patch', className)}>
    <div className="Patch__title">{oldFile} {newFile}</div>
    {hunks.map((hunk, index) => (
      <div className="Patch__hunk" key={`${hunk.header}-${index}`}>
        <div className="Patch__hunkHeader">
          {hunk.header}
        </div>
        <div className="Patch__lines">
          {hunk.lines.map((line: string, index: number) => (
            <Line key={`${line}-${index}`}>{line}</Line>
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default Patch
