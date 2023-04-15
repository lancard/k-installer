const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1A202D',
    icon: 'resources/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.removeMenu();

  mainWindow.maximize();

  if (process.env.NODE_ENV == 'development') {
    globalShortcut.register('F5', () => {
      mainWindow.isFocused() && mainWindow.reload();
    });
  }
  else {
    globalShortcut.register('CmdOrCtrl+F5', () => {
      mainWindow.isFocused() && mainWindow.reload();
    });
  }

  globalShortcut.register('CmdOrCtrl+F12', () => {
    mainWindow.isFocused() && mainWindow.webContents.toggleDevTools();
  });

  if (process.env.NODE_ENV == 'development') {
    mainWindow.loadFile('resources/index.html');
  }
  else {
    mainWindow.loadURL("https://lancard.github.io/k-installer/index.html");
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