const { app, BrowserWindow } = require('electron');
const path = require('path');

function upsertKeyValue(header, keyToChange, value) {
  for (const key of Object.keys(header)) {
    if (key.toLowerCase() === keyToChange.toLowerCase()) {
      header[key] = value;
      return;
    }
  }
  header[keyToChange] = value;
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1b2434',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.removeMenu();

  mainWindow.maximize();

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { requestHeaders } = details;
      upsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', '*');
      callback({ requestHeaders });
    },
  );

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    const { responseHeaders } = details;
    upsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
    upsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
    callback({
      responseHeaders,
    });
  });

  mainWindow.loadURL('https://airplane.mywire.org').then();
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