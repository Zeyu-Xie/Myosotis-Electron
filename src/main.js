const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

ipcMain.handle('createNewWindow', () => {
  const newWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: true,
    autoHideMenuBar: true,
    title: "Myosotis Electron - Test",
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path.join(__dirname, 'test.html'));
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    title: "Myosotis Electron",
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on("dom-ready", () => {
    console.log("Lifecycle: 2, dom-ready");
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Lifecycle: 3, did-finish-load");
  });

  mainWindow.webContents.on("close", () => {
    console.log("Lifecycle: 8, close");
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  console.log("Lifecycle: 1, app-ready");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

  console.log("Lifecycle: 4, window-all-closed");
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on("before-quit", () => {
  console.log("Lifecycle: 5, before-quit");
});

app.on("will-quit", () => {
  console.log("Lifecycle: 6, will-quit");
});

app.on("quit", () => {
  console.log("Lifecycle: 7, quit");
});