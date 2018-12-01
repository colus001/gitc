// @flow
const childProcess = require('child_process')
const chalk = require('chalk')

const startup = () => {
  const webpackProcess = startWebpackProcess()
  let electronProcess

  webpackProcess.stdout.on('data', (buffer) => {
    const message = buffer.toString()
    console.info(chalk.magenta(message))

    if (!electronProcess && message.includes('Compiled successfully!')) {
      electronProcess = startElectronProcess()

      electronProcess.stdout.on('data', (buffer) => {
        console.log(chalk.green(buffer.toString()))
      })
      electronProcess.stderr.on('data', (buffer) => {
        console.log(chalk.red(buffer.toString()))
      })
    }
  })

  webpackProcess.stderr.on('data', (buffer) => {
    console.info(chalk.magenta(buffer.toString()))
  })

  const greafulDead = () => {
    if (webpackProcess) webpackProcess.kill()
    if (electronProcess) electronProcess.kill()
  }

  process.on('SIGINT', greafulDead)
  process.on('exit', greafulDead)
}

startup()

function startWebpackProcess() {
  return childProcess.spawn('npm', ['run', 'webpack'])
}

function startElectronProcess() {
  return childProcess.spawn('npm', ['run', 'electron'])
}
