// @flow
import { getRepo } from './repo'

const path = window.require('path')
const { Repository } = window.require('nodegit')

export const getDiff = async (sha: string) => {
  const repo = await Repository.open(path.resolve('../zerocar-app'))
  const commit = await repo.getCommit(sha)
  return await commit.getDiff()
}

export const parseDiff = async (patches: any): Promise<Array<Diff>> => {
  return await Promise.all(patches.map(async (patch) => {
    const rawHunks = await patch.hunks()

    const hunks = await Promise.all(rawHunks.map(async (hunk) => {
      const lines = await hunk.lines()

      return {
        header: hunk.header().trim(),
        lines: lines.map((line) => String.fromCharCode(line.origin()) + line.content()),
      }
    }))

    return {
      oldFile: patch.oldFile().path(),
      newFile: patch.newFile().path(),
      hunks,
    }
  }))
}
