// @flow
import { formatDefault } from 'formatters/date'

const { Repository } = window.require('nodegit')

export const getLogFromHead = async (path: string) => {
  const repo = await Repository.open(path)
  const firstCommit = await repo.getHeadCommit()
  return await getCommitLogsFromHistory(firstCommit.history())
}

export const getCommitLogs = (commit: any) => getCommitLogsFromHistory(commit.history())

export function getCommitLogsFromHistory(history: any): Promise<Array<CommitLog>> {
  return new Promise((resolve, reject) => {
    history.on('end', (commits) => {
      resolve(commits.map((commit) => {
        const author = commit.author()
        const committer = commit.committer()

        return {
          sha: commit.sha(),
          author: getFullName(author),
          committer: getFullName(committer),
          date: commit.date(),
          message: commit.message(),
        }
      }))
    })
    history.on('error', reject)
    history.start()
  })
}

function getFullName(author: Author): string {
  const name = author.name()
  const email = author.email()
  const date = formatDefault(author.when().time() * 1000)

  return email ? `${name} <${email}> ${date}` : `name ${date}`
}
