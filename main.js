const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const os = require('os');

function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function downloadFile(filename, url, callback) {
  const oldPath = randomString(32);
  const file = fs.createWriteStream(oldPath);
  https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      fs.renameSync(oldPath, filename);
      console.log(`Download Completed: ${filename} <- ${url}`);
      callback(filename, url);
    });
  });
}

function updateIndexPageAndRedirect(mainWindow) {
  downloadFile('index.html', 'https://raw.githubusercontent.com/lancard/k-installer/master/index.html', () => {
    mainWindow.loadFile('index.html');
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1b2434',
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
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})