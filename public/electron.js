const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Menu = electron.Menu

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: isDev ? './public/favicon.ico' : __dirname + '/favicon.ico'
  })

  mainWindow.maximize()

  mainWindow.loadURL(
    isDev
      ? 'http://127.0.0.1:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

Menu.setApplicationMenu(null)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
