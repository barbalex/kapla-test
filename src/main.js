const { app, BrowserWindow, ipcMain, shell } = require('electron')
const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.maximize()

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  setTimeout(() => {
    const printToPDFOptions = {
      marginsType: 0,
      printBackground: true,
    }
    const path = `${homedir}\\test.pdf`
    mainWindow.webContents.printToPDF(printToPDFOptions).then((data) => {
      console.log('will output file:', { data, path })
      fs.writeFile(path, data, (err) => {
        if (err) return console.log(err.message)
        console.log('will read file in path:', path)
        shell.openPath(path)
      })
    })
  }, 5000)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
