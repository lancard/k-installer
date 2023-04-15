const { app, BrowserWindow, globalShortcut } = require('electron');
const fs = require('fs');
const path = require('path');
const request = require('request');
const progress = require('request-progress');

function randomString(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

function downloadFile(filename, url, callback) {
  const oldPath = randomString(32);
  const file = fs.createWriteStream(oldPath);

  progress(request(url), {
  })
    .on('error', function (err) {
      console.log(err);
    })
    .on('end', function () {
      file.close();
      fs.renameSync(oldPath, filename);
      callback(filename, url);
    })
    .pipe(file);
};

function updateIndexPageAndRedirect(mainWindow) {
  downloadFile('index.html', 'https://raw.githubusercontent.com/lancard/k-installer/master/index.html', () => {
    mainWindow.loadFile('index.html');
  });
}

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