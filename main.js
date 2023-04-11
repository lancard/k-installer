const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

function downloadFile(path, url) {
  const file = fs.createWriteStream(path);
  const request = https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
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
    downloadFile('index.html', '')
  });

  globalShortcut.register('CmdOrCtrl+F12', () => {
    mainWindow.isFocused() && mainWindow.webContents.toggleDevTools();
  });

  console.dir(fs.readdirSync('.'));
  mainWindow.loadFile('index.html');
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