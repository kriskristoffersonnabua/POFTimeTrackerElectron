const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

//set global variables 
global.API_URL = "http://127.0.0.1:8000/"
global.CLIENT_KEY = "ObUVtdnDjNAfU9LfECkstscv7GjKv2QqANCLhAUe"

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})