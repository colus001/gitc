// @flow
const { Repository } = window.require('nodegit')

export const getRepo = async (path: string) => {
  return await Repository.open(path)
}
