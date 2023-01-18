const path = require('path')
const { BrowserWindow, app } = require("electron")

const isDev = process.env.NODE_ENV !== "production"

const isMac = process.platform === 'darwin'

const createWindow = () => {
    const win = new BrowserWindow({ title: 'Notary Slides', width: 500, height: 600 })

    // Development Environment
    if (isDev) {
        win.webContents.openDevTools();
        win.setSize(1000, 600)
    }

    win.loadFile(path.join(__dirname, './views/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
})