const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const util = require('./util.js');

function updateIndexPageAndRedirect(mainWindow) {
  util.downloadFile('index.html', 'https://raw.githubusercontent.com/lancard/k-installer/master/index.html', () => {
    mainWindow.loadFile('index.html');
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1A202D',
    icon: 'icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.removeMenu();

  mainWindow.maximize();

  globalShortcut.register('CmdOrCtrl+F5', () => {
    mainWindow.isFocused() && mainWindow.reload();
  });

  globalShortcut.register('CmdOrCtrl+F7', () => {
    updateIndexPageAndRedirect(mainWindow);
  });

  globalShortcut.register('CmdOrCtrl+F12', () => {
    mainWindow.isFocused() && mainWindow.webContents.toggleDevTools();
  });

  if (process.env.NODE_ENV == 'development') {
    mainWindow.loadFile('index.html');
  }
  else {
    mainWindow.loadFile('holding.html');
    updateIndexPageAndRedirect(mainWindow);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})