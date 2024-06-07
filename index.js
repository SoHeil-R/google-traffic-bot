const path = require('path')
const seobot = require('./libs/index')
const proxys = require('./libs/proxy')
const { app, BrowserWindow, ipcMain } = require('electron')

async function createWindow() {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
}

ipcMain.handle('start', async (event, url, keyboard, count, option) => {
    seobot.main(url, keyboard, count, option)
})

ipcMain.handle('stop', async (event) => {
    seobot.stop()
})

ipcMain.handle('proxylist', async (event) => {
    var proxylist = await proxys()
    return proxylist.length
})

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})