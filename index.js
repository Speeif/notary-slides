const path = require('path')
const { BrowserWindow, app, Menu } = require("electron")
/**                                                                              **\
*  =============================================================================  *
*                                      Vars                                    *
*  =============================================================================  *
\*                                                                               */

const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === 'darwin'

let mainWindow

/**                                                                              **\
*  =============================================================================  *
*                                      Windows                                    *
*  =============================================================================  *
\*                                                                               */

// Create the main window of the application
const createMainWindow = () => {
    mainWindow = new BrowserWindow({ title: 'Notary Slides', width: 500, height: 600 })

    // Development Environment
    if (isDev) {
        mainWindow.webContents.openDevTools();
        mainWindow.setSize(1000, 600)
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

const createAboutWindow = () => {
    const win = new BrowserWindow({ title: "About Notary Slides", width: 400, height: 400 })

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.loadFile(path.join(__dirname, './renderer/about.html'))
}


/**                                                                              **\
*  =============================================================================  *
*                                      actions                                    *
*  =============================================================================  *
\*                                                                               */

// When the app is loaded, then serve it.
app.whenReady().then(() => {
    createMainWindow()

    // Append window menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu)

    // On ios "whenReady" can load before it is ready, while "activate" gives us the right information 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
})


/**                                                                              **\
*  =============================================================================  *
*                                      manu                                       *
*  =============================================================================  *
\*                                                                               */

// TODO export to own file.
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: "about",
                click: createAboutWindow
            },
            {
                label: "open developer tools",
                click: () => mainWindow.webContents.toggleDevTools()
            }
        ]
    }] : []),
    {
        label: "File",
        submenu: [
            {
                label: "Save",
                click: () => {/* TODO: Make a save function */ },
                accelerator: "Ctrl+S",
            },
            {
                label: "Quit",
                click: () => app.quit(),
                accelerator: 'CmdOrCtrl+W',
            }
        ]
    },
    ...(!isMac ? [{
        label: "Help",
        submenu: [
            {
                label: "about",
                click: createAboutWindow
            },
            {
                label: "open dev tools",
                click: () => mainWindow.webContents.toggleDevTools()
            }
        ]
    }] : [])
];