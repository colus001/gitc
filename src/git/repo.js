// @flow
const { dialog } = window.require('electron').remote
const { Repository } = window.require('nodegit')
const path = window.require('path')

let repo
export const getRepo = async () => {
  try {
    if (!repo) repo = await Repository.open(path.resolve('../'))
  } catch(e) {
    if (!e.message.includes('could not find repository')) {
        console.error(e)
        return null
    }

    const directories = dialog.showOpenDialog({
      title: 'Open direcotry',
      defaultPath: path.resolve('./'),
      properties: ['openDirectory'],
    })

    repo = await Repository.open(path.resolve(directories[0]))
  }

  return repo
}

let head
export const getHead = async () => {
  repo = repo || await getRepo()
  if (!head) head = await repo.getHeadCommit()
  return head
}
