// @flow
const { Repository } = window.require('nodegit')
const path = window.require('path')

let repo
export const getRepo = async (loc: string) => {
  if (!repo) repo = await Repository.open(path.resolve(loc))
  return repo
}

let head
export const getCommit = async (loc: string) => {
  const repo = await getRepo(loc)
  if (!head) head = await repo.getHeadCommit()
  return head
}
