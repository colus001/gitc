// @flow
import React from 'react'
import classNames from 'classnames'

import './Line.scss'

type Props = {
  className?: string,
  children: Children,
}

const Line = ({ className, children }: Props) => (
  <div
    className={classNames('Line', className, getPainter(children))}
  >
    {children}
  </div>
)

export default Line

function getPainter(x: any): ?string {
  if (!x || typeof x !== 'string') return null
  if (x[0] === '+') return 'Line--added'
  if (x[0] === '-') return 'Line--removed'
}
