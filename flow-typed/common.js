/* eslint-disable */
import * as React from 'react'
import type { Node as ReactNode } from 'react'
// import type { Observable, Subscription } from 'rxjs'
// import type Moment from 'moment'
// import type Swiper from 'Swiper'

declare var window: any

declare type Children = ReactNode

declare type Dispatch = (action: Action) => any

declare type OwnProps = {
  [key: string]: any,
}

declare type Store = {
  getState: () => any,
  dispatch: Dispatch,
}

declare type Payload = Object

declare type Action = {
  type: string,
  payload?: Payload
}

declare type CommitLog = {
  sha: string,
  author: string,
  committer: string,
  date: Date,
  message: string,
}

declare type ReduxProps = {
  logs: Array<CommitLog>,
}

type Author = {
  name: () => string,
  email: () => ?string,
  when: () => {
    time: () => number,
  },
}

type Diff = {
  newFile: string,
  oldFile: string,
  hunks: Array<{
    header: string,
    lines: Array<string>,
  }>,
}
