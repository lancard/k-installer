const { app, BrowserWindow, globalShortcut } = require('electron');
app.commandLine.appendSwitch("disable-http-cache");
const electronRemoteMain = require('@electron/remote/main');

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

  electronRemoteMain.initialize();
  electronRemoteMain.enable(mainWindow.webContents);

  mainWindow.removeMenu();
  mainWindow.maximize();

  // CORS
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
    const { requestHeaders } = details;
    requestHeaders['Access-Control-Allow-Origin'] = '*';
    callback({ requestHeaders });
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    console.dir(responseHeaders);
    responseHeaders['Access-Control-Allow-Origin'] = '*';
    responseHeaders['Access-Control-Allow-Headers'] = '*';
    callback({ responseHeaders });
  });

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

app.on("browser-window-created", (e, win) => {
  win.removeMenu();
  win.maximize();
});