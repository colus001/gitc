// @flow
const { app, BrowserWindow } = require('electron')
const Git = require('nodegit')

let mainWindow = null
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL('http://localhost:3000')
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', app.quit)
}

app.on('ready', createWindow)
app.on('window-all-closed', app.quit)
