// @flow
import dayjs from 'dayjs'

export const formatDefault = (date: Date | number): string => dayjs(date)
  .format('YYYY-MM-DD HH:mm:ss')
